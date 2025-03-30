import { ResponseError } from "./responseError";

export class LikeRepositoryValidationError extends ResponseError {
  constructor(message: string) {
      super(message, 400); // Example status code for bad request
      this.name = 'LikeRepositoryValidationError';
  }
}