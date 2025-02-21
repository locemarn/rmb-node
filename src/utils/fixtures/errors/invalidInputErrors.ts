export class InvalidInputErrors extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidInputErrors'
  }
}
