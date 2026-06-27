// Exception for attempting to add duplicate items to a list.
export class DuplicateItemError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'DuplicateItemError';
    Object.setPrototypeOf(this, DuplicateItemError.prototype);
  }
}