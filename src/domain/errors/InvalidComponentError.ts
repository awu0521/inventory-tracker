// Exception for when shipment JSON does not match the expected structure.
export class InvalidComponentError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'InvalidComponentError';
    Object.setPrototypeOf(this, InvalidComponentError.prototype);
  }
}