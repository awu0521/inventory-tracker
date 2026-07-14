// Exception for when shipment JSON does not match the expected structure.
export class InvalidShipmentError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'InvalidShipmentError';
    Object.setPrototypeOf(this, InvalidShipmentError.prototype);
  }
}