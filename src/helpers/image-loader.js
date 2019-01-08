// @flow
export default class ImageLoader {
  static images: { [key: string]: Image } = {}

  static load(sources: { [key: string]: string }) {
    for (const src in sources) {
      if (!this.images[src]) {
        this.images[src] = new Image()
        this.images[src].src = sources[src]
      }
    }
  }

  static get(name: 'ship' | 'invader' | 'invaderShot' | 'heart') {
    return this.images[name]
  }
}
