import { DuplicateError } from "../errors/DuplicateError";
import { NotFoundError } from "../errors/NotFoundError";
import { Shipment } from "../models/Shipment";

export class ShipmentQueue {
    private shipments: Shipment[] = [];

    getQueue(): Shipment[] {
        return this.shipments;
    }
    
    // cannot add duplicate shipments
    // throws DuplicateItemError if shipment already added
    add(shipment: Shipment): void {
        if (this.shipments.indexOf(shipment) === -1) this.shipments.push(shipment);
        else throw new DuplicateError('Cannot add duplicate shipments.');
    }

    // throws NotFoundError if shipment not added
    remove(shipment: Shipment): void {
        const index = this.shipments.indexOf(shipment);

        if (index === -1) throw new NotFoundError('Cannot remove unadded shipment.');
        else this.shipments.splice(index, 1);
    }
}