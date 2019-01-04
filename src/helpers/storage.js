const TYPES = {
  USERNAME: 'tv-game/username',
  LEADERBOARDS: 'tv-game/leaderboards'
}

export const stubsLeaderboards = [
  { username: 'Igor', score: '11 000' },
  { username: '', score: '' },
  { username: '', score: '' },
  { username: '', score: '' },
  { username: '', score: '' },
  { username: '', score: '' },
  { username: '', score: '' },
  { username: '', score: '' },
  { username: '', score: '' },
  { username: '', score: '' },
  { username: '', score: '' },
  { username: '', score: '' }
]

export default class Storage {
  static getUsername() {
    return localStorage.getItem(TYPES.USERNAME)
  }

  static setUsername(value) {
    localStorage.setItem(TYPES.USERNAME, value)
    return value
  }

  static getLeaderboards() {
    return localStorage.getItem(TYPES.LEADERBOARDS) || stubsLeaderboards
  }

  static addToLeaderboards(value) {
    /** @todo filter */
    localStorage.setItem(TYPES.LEADERBOARDS, value)
  }
}
