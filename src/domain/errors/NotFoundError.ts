// Exception for attempting to add duplicate items to a list.
export class NotFoundError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}