export default class Rainbow {
  private rainbow = new Array(this.size)
  private currentIndex = 0

  constructor (public size = 12) {
    this.size = size
    this.build()
  }

  get color () {
    const color = this.rainbow[this.currentIndex]
    this.next()
    return color
  }

  next () {
    this.currentIndex += 1
    if (this.currentIndex === this.rainbow.length - 1) {
      this.currentIndex = 0
    }
  }

  private build () {
    for (let i = 0; i < this.size; i++) {
      const red = this.sinToHex(i, 0 * Math.PI * 2 / 3) // 0   deg
      const blue = this.sinToHex(i, 1 * Math.PI * 2 / 3) // 120 deg
      const green = this.sinToHex(i, 2 * Math.PI * 2 / 3) // 240 deg

      this.rainbow[i] = '#' + red + green + blue
    }
  }

  sinToHex (i, phase) {
    const sin = Math.sin(Math.PI / this.size * 2 * i + phase)
    const int = Math.floor(sin * 127) + 128
    const hex = int.toString(16)

    return hex.length === 1 ? '0' + hex : hex
  }
}
