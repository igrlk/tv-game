// @flow
type names =
  | 'hover'
  | 'click'
  | 'rocketFiring'
  | 'invaderDestroying'
  | 'shipHitting'

export default class SoundsPlayer {
  static isMuted: boolean = false
  static sounds: { [key: string]: string } = {}

  static add(soundName: names, src: string) {
    this.sounds[soundName] = src
  }

  static play(soundName: names, volume?: number = 1) {
    if (!this.isMuted) {
      const audio = new Audio(this.sounds[soundName])
      audio.volume = volume
      audio.play()
    }
  }

  static setIsMuted(value: boolean) {
    this.isMuted = value
  }
}
