import { ShipmentStatus } from "../enums/ShipmentStatus";
import { DuplicateError } from "../errors/DuplicateError";
import { NotFoundError } from "../errors/NotFoundError";
import { Shipment } from "./Shipment";

export class Warehouse {
    private storage: Shipment[] = [];
    private name: string;
    private address: string;
    
    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
    }

    // cannot add duplicate shipments
    // throws DuplicateItemError if shipment already added
    add(shipment: Shipment): void {
        if (this.storage.indexOf(shipment) === -1) this.storage.push(shipment);
        else throw new DuplicateError('Cannot add duplicate shipments.');
    }

    // throws NotFoundError if shipment not added
    remove(shipment: Shipment): void {
        const index = this.storage.indexOf(shipment);

        if (index === -1) throw new NotFoundError('Cannot remove unadded shipment.');
        else this.storage.splice(index, 1);
    }

    // returns all shipments with ShipmentStatus INCOMING tag.
    getIncoming(): Shipment[] {
        return this.storage.filter(shipment => shipment.getStatus() === ShipmentStatus.INCOMING);
    }

    // returns all shipments with ShipmentStatus OUTGOING tag.
    getOutgoing(): Shipment[] {
        return this.storage.filter(shipment => shipment.getStatus() === ShipmentStatus.OUTGOING);
    }

    getName(): string {
        return this.name;
    }

    getAddress(): string {
        return this.address;
    }
}