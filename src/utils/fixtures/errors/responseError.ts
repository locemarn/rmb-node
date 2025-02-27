export class ResponseError extends Error {
  constructor(message: string) {
    // console.error('akiii', message)
    super(message)
    this.name = 'ResponseError'
  }
}
