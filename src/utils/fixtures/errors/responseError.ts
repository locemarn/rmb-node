export class ResponseError extends Error {
  constructor(message: string) {
    console.log('akiii', message)
    super(message)
    this.name = 'ResponseError'
  }
}
