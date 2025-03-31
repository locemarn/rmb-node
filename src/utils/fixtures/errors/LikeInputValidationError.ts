export class LikeInputValidationError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'LikeInputValidationError';
    this.statusCode = statusCode ?? 400;
  }
}