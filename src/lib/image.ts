export const loadImage = (path: string) => {
  return new Promise<CanvasImageSource>((r) => {
    let i = new Image()
    i.onload = () => r(i)
    i.src = path
  })
}
