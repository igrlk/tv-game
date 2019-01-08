const TYPES = {
  USERNAME: 'tv-game/username',
  LEADERBOARDS: 'tv-game/leaderboards'
}

export const stubsLeaderboards = JSON.stringify([
  { username: 'Igor', score: 11000 },
  { username: null, score: null },
  { username: null, score: null },
  { username: null, score: null },
  { username: null, score: null },
  { username: null, score: null },
  { username: null, score: null },
  { username: null, score: null },
  { username: null, score: null },
  { username: null, score: null },
  { username: null, score: null },
  { username: null, score: null }
])

export const stubUsername = 'new_player'

export default class Storage {
  static getUsername() {
    return localStorage.getItem(TYPES.USERNAME) || stubUsername
  }

  static setUsername(value) {
    localStorage.setItem(TYPES.USERNAME, value)
    return value
  }

  static getLeaderboards() {
    const result = localStorage.getItem(TYPES.LEADERBOARDS) || stubsLeaderboards
    return JSON.parse(result)
  }

  static setLeaderboards(leaderboards) {
    localStorage.setItem(
      TYPES.LEADERBOARDS,
      JSON.stringify(leaderboards.splice(0, 12))
    )
  }

  static addToLeaderboards(score) {
    const leaderboards = this.getLeaderboards()
    const result = {
      username: this.getUsername(),
      score
    }

    const index = leaderboards.findIndex(el => el.score < score)
    if (index !== -1) {
      leaderboards.splice(index, 0, result)

      this.setLeaderboards(leaderboards)

      return {
        place: index + 1,
        success: true
      }
    }

    return { place: null, success: false }
  }
}
