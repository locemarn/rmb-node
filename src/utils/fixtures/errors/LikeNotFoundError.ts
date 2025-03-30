import { ResponseError } from "./responseError";

export class LikeNotFoundError extends ResponseError {
  constructor(postId: number, userId: number) {
    super(`Like not found for post ${postId} and user ${userId}`, 404); // Example status code
    this.name = 'LikeNotFoundError';
  }
}