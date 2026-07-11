// Exception for when dates do not match the expected structure.
export class InvalidDateError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'InvalidDateError';
    Object.setPrototypeOf(this, InvalidDateError.prototype);
  }
}