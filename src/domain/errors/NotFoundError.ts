// Exception for attempting to remove unadded items from a list.
export class NotFoundError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}