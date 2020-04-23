export function createRainbow (size = 12) {
  const rainbow = new Array(size)

  const sinToHex = (i, phase) => {
    const sin = Math.sin(Math.PI / size * 2 * i + phase)
    const int = Math.floor(sin * 127) + 128
    const hex = int.toString(16)

    return hex.length === 1 ? '0' + hex : hex
  }

  for (let i = 0; i < size; i++) {
    const red = sinToHex(i, 0 * Math.PI * 2 / 3) // 0   deg
    const blue = sinToHex(i, 1 * Math.PI * 2 / 3) // 120 deg
    const green = sinToHex(i, 2 * Math.PI * 2 / 3) // 240 deg

    rainbow[i] = '#' + red + green + blue
  }

  return rainbow
}
