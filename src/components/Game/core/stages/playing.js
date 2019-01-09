// @flow
import Game from '../game'
import GameOverStage from './game-over'
import { Ship, Invader, Bomb, Rocket } from '../units'
import { config as gameConfig } from '../config'

import ImageLoader from '../../../../helpers/image-loader'
import SoundsPlayer from '../../../../helpers/sounds-player'
import { getNiceScore } from '../../../../helpers/score'
import { KEY_LEFT, KEY_RIGHT, KEY_SPACE } from '../constants'

export default class PlayStage {
  invaderCurrentVelocity: number = 10
  invaderCurrentDropDistance: number = 0
  isInvadersAreDropping: boolean = false
  lastTimeRocketWasCreated: number = 0

  ship: Ship = null
  invaders: Array<Invader> = []
  rockets: Array<Rocket> = []
  bombs: Array<Bomb> = []

  config: $Exact<typeof gameConfig>

  shipSpeed: number = 0
  invaderInitialVelocity: number = 0
  bombDropChance: number = 0
  bombVelocity: number = 0
  invaderVelocity: { x: number, y: number } = {
    x: -this.invaderInitialVelocity,
    y: 0
  }
  invaderNextVelocity: ?{ x: number, y: number } = null

  constructor(config: $Exact<typeof gameConfig>) {
    this.config = config
  }

  enter(game: Game) {
    if (!game.ship) {
      game.ship = new Ship({ x: game.width / 2, y: game.gameBounds.bottom })
    }
    this.ship = game.ship

    const {
      shipSpeed,
      invaderInitialVelocity,
      bombDropChance,
      bombVelocity
    } = this.config

    this.shipSpeed = shipSpeed
    this.invaderInitialVelocity = invaderInitialVelocity
    this.bombDropChance = bombDropChance
    this.bombVelocity = bombVelocity

    this.invaders = []
    const enemiesCountInRow = 9
    const enemiesCountInColumn = 5
    for (let i = 0; i < enemiesCountInColumn; i++) {
      for (let j = 0; j < enemiesCountInRow; j++) {
        this.invaders.push(
          new Invader({
            x:
              game.width / 2 +
              ((enemiesCountInRow / 2 - j) * 700) / enemiesCountInRow,
            y: game.gameBounds.top + i * 60,
            verticalOrder: i,
            horizontalOrder: j
          })
        )
      }
    }

    this.invaderCurrentVelocity = this.invaderInitialVelocity
    this.invaderVelocity = { x: -this.invaderInitialVelocity, y: 0 }
    this.invaderNextVelocity = null
  }

  update(game: Game, dt: number) {
    this.checkPressedKeys(game, dt)

    this.checkWinLossConditions(game)

    this.moveInvaders(game, dt)

    this.checkBounds(game, dt)

    this.dropBombs(game, dt)

    this.checkCollisions(game)
  }

  draw(game: Game, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, game.width, game.height)

    this.drawUnits(game, ctx)

    this.drawStats(game, ctx)
  }

  drawUnits(game: Game, ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      ImageLoader.get('ship'),
      this.ship.x - this.ship.width / 2,
      this.ship.y - this.ship.height / 2,
      this.ship.width,
      this.ship.height
    )

    this.invaders.forEach(invader => {
      ctx.drawImage(
        ImageLoader.get('invader'),
        invader.x - invader.width / 2,
        invader.y - invader.height / 2,
        invader.width,
        invader.height
      )
    })

    this.bombs.forEach(bomb => {
      ctx.drawImage(
        ImageLoader.get('invaderShot'),
        bomb.x - 24,
        bomb.y - 2,
        33,
        26
      )
    })

    ctx.fillStyle = '#fff'
    this.rockets.forEach(rocket => {
      ctx.fillRect(rocket.x - 2, rocket.y - 18, 4, 4)
    })
  }

  drawStats(game: Game, ctx: CanvasRenderingContext2D) {
    const { left, right } = game.gameBounds
    const offset = (game.width - right) / 2
    const bottom = game.gameBounds.bottom - 10

    ctx.font = '20px "Press Start 2P"'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'left'
    ctx.fillText('SCORE', left - offset, bottom)
    ctx.fillText(getNiceScore(game.score), left - offset, bottom + 40)

    ctx.textAlign = 'right'
    ctx.fillText('LIVES', right + offset, bottom)
    for (let i = 0; i < game.lives; i++) {
      ctx.drawImage(
        ImageLoader.get('heart'),
        right + offset - 25 * (i + 1) + 2,
        bottom + 20,
        23,
        23
      )
    }
  }

  moveInvaders(game: Game, dt: number) {
    const enemyHits = {
      left: false,
      right: false,
      bottom: false
    }

    this.invaders.forEach(invader => {
      const newCoords = {
        x: invader.x + this.invaderVelocity.x * dt,
        y: invader.y + this.invaderVelocity.y * dt
      }

      if (newCoords.x < game.gameBounds.left) {
        enemyHits.left = true
      } else if (newCoords.x > game.gameBounds.right) {
        enemyHits.right = true
      }

      if (newCoords.y > game.gameBounds.bottom) {
        enemyHits.bottom = true
      }

      if (!enemyHits.left && !enemyHits.right && !enemyHits.bottom) {
        invader.x = newCoords.x
        invader.y = newCoords.y
      }
    })

    this.updateInvaderSettings(enemyHits, dt)

    if (enemyHits.bottom) {
      game.lives = 0
    }
  }

  updateInvaderSettings(
    enemyHits: {
      left: boolean,
      right: boolean,
      bottom: boolean
    },
    dt: number
  ) {
    if (this.isInvadersAreDropping) {
      this.invaderCurrentDropDistance += this.invaderVelocity.y * dt
      if (this.invaderCurrentDropDistance >= this.config.invaderDropDistance) {
        this.isInvadersAreDropping = false
        if (this.invaderNextVelocity) {
          this.invaderVelocity = this.invaderNextVelocity
        }
        this.invaderCurrentDropDistance = 0
      }
    }

    if (enemyHits.left) {
      this.updateInvaderVelocity(this.invaderCurrentVelocity)
    }

    if (enemyHits.right) {
      this.updateInvaderVelocity(-this.invaderCurrentVelocity)
    }
  }

  updateInvaderVelocity(x: number) {
    this.bombDropChance += 0.005
    this.invaderCurrentVelocity += this.config.invaderAcceleration
    this.invaderVelocity = { x: 0, y: this.invaderCurrentVelocity }
    this.isInvadersAreDropping = true
    this.invaderNextVelocity = { x, y: 0 }
  }

  createRocket(game: Game) {
    const rocketCanBeCreated =
      new Date().valueOf() - this.lastTimeRocketWasCreated > 500

    if (rocketCanBeCreated) {
      this.rockets.push(
        new Rocket({
          x: this.ship.x,
          y: this.ship.y - 12,
          velocity: this.config.rocketVelocity
        })
      )

      this.lastTimeRocketWasCreated = new Date().valueOf()

      SoundsPlayer.play('rocketFiring', 0.25)
    }
  }

  checkPressedKeys(game: Game, dt: number) {
    if (game.pressedKeys[KEY_LEFT]) {
      this.ship.x -= this.shipSpeed * dt
    }
    if (game.pressedKeys[KEY_RIGHT]) {
      this.ship.x += this.shipSpeed * dt
    }
    if (game.pressedKeys[KEY_SPACE]) {
      this.createRocket(game)
    }
  }

  checkWinLossConditions(game: Game) {
    if (game.lives <= 0) {
      game.ship = null
      game.setStage(new GameOverStage(game))
    }

    if (this.invaders.length === 0) {
      game.score += this.config.winReward
      game.setStage(new PlayStage(game.config))
    }
  }

  checkBounds(game: Game, dt: number) {
    if (this.ship.x < game.gameBounds.left) {
      this.ship.x = game.gameBounds.left
    }
    if (this.ship.x > game.gameBounds.right) {
      this.ship.x = game.gameBounds.right
    }

    this.bombs.forEach((bomb, index, arr) => {
      bomb.y += dt * bomb.velocity

      if (bomb.y > game.height) {
        arr.splice(index, 1)
      }
    })

    this.rockets.forEach((rocket, index, arr) => {
      rocket.y -= dt * rocket.velocity

      if (rocket.y < 0) {
        arr.splice(index, 1)
      }
    })
  }

  dropBombs(game: Game, dt: number) {
    const frontInvaders = {}
    this.invaders.forEach(invader => {
      const { horizontalOrder, verticalOrder } = invader
      if (
        !frontInvaders[horizontalOrder] ||
        frontInvaders[horizontalOrder].verticalOrder < verticalOrder
      ) {
        frontInvaders[horizontalOrder] = invader
      }
    })

    Object.keys(frontInvaders).forEach(key => {
      const invader = frontInvaders[key]

      const chance = this.bombDropChance * dt
      if (chance > Math.random()) {
        this.bombs.push(
          new Bomb({
            x: invader.x,
            y: invader.y + invader.height / 2,
            velocity: this.bombVelocity
          })
        )
      }
    })
  }

  checkCollisions(game: Game) {
    this.checkRocketInvaderCollision(game)

    this.checkBombShipCollision(game)

    this.checkInvaderShipCollision(game)
  }

  checkRocketInvaderCollision(game: Game) {
    this.invaders.forEach((invader, index, invaders) => {
      /* eslint-disable-next-line */
      this.rockets.some((rocket, rocketIndex, rockets) => {
        if (
          rocket.x >= invader.x - invader.width / 2 &&
          rocket.x <= invader.x + invader.width / 2 &&
          rocket.y >= invader.y - invader.height / 2 &&
          rocket.y <= invader.y + invader.height / 2
        ) {
          this.rockets.splice(rocketIndex, 1)
          invaders.splice(index, 1)
          SoundsPlayer.play('invaderDestroying', 0.25)

          game.score += this.config.invaderKillReward
          return 1
        }
      })
    })
  }

  checkBombShipCollision(game: Game) {
    this.bombs.forEach((bomb, index, arr) => {
      const { x, y, width, height } = this.ship
      if (
        bomb.x >= x - width / 2 &&
        bomb.x <= x + width / 2 &&
        bomb.y >= y - height / 2 &&
        bomb.y <= y + height / 2
      ) {
        arr.splice(index, 1)
        game.lives--
        SoundsPlayer.play('shipHitting', 0.25)
      }
    })
  }

  checkInvaderShipCollision(game: Game) {
    this.invaders.forEach(invader => {
      const { x, y, width, height } = this.ship
      if (
        invader.x + invader.width / 2 > x - width / 2 &&
        invader.x - invader.width / 2 < x + width / 2 &&
        invader.y + invader.height / 2 > y - height / 2 &&
        invader.y - invader.height / 2 < y + height / 2
      ) {
        game.lives = 0
        SoundsPlayer.play('shipHitting', 0.25)
      }
    })
  }
}
