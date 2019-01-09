export class Ship {
  constructor({ x, y }) {
    this.x = x
    this.y = y
    this.width = 73
    this.height = 73
  }
}

export class Rocket {
  constructor({ x, y, velocity }) {
    this.x = x
    this.y = y
    this.velocity = velocity
  }
}

export class Bomb {
  constructor({ x, y, velocity }) {
    this.x = x
    this.y = y
    this.velocity = velocity
  }
}

export class Invader {
  constructor({ x, y, verticalOrder, horizontalOrder }) {
    this.x = x
    this.y = y
    this.verticalOrder = verticalOrder
    this.horizontalOrder = horizontalOrder
    this.width = 75
    this.height = 55
  }
}
