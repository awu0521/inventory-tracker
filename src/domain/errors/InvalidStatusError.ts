// Exception for attempting to revert back to a shipment status of INCOMING.
export class InvalidStatusError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'InvalidStatusError';
    Object.setPrototypeOf(this, InvalidStatusError.prototype);
  }
}