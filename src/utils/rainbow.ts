export default class Rainbow {
  private currentIndex = 0

  constructor (public size = 12) {
    this.size = size
  }

  get color () {
    const color = Rainbow.getHexColorByIndex(this.currentIndex, this.size)
    this.next()
    return color
  }

  next () {
    if (this.currentIndex === this.size) {
      this.currentIndex = 0
    } else {
      this.currentIndex += 1
    }
  }

  static getHexColorByIndex (index: number, size: number) {
    const red = Rainbow.sinToHex(index, size, 0 * Math.PI * 2 / 3) // 0   deg
    const blue = Rainbow.sinToHex(index, size, 1 * Math.PI * 2 / 3) // 120 deg
    const green = Rainbow.sinToHex(index, size, 2 * Math.PI * 2 / 3) // 240 deg

    return '#' + red + green + blue
  }

  static sinToHex (index: number, size: number, phase: number) {
    const sin = Math.sin(Math.PI / size * 2 * index + phase)
    const int = Math.floor(sin * 127) + 128
    const hex = int.toString(16)

    return hex.length === 1 ? '0' + hex : hex
  }
}
