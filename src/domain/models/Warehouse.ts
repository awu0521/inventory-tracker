import { Shipment } from "./Shipment";

export class Warehouse {
    private storage: Shipment[] = [];
    private name: string;
    private address: string;
    
    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
    }

    add(shipment: Shipment): void {
        // stub
    }

    remove(shipment: Shipment): void {
        // stub
    }

    // TODO: implement using ShipmentStatus INCOMING tag.
    getIncoming(): Shipment[] {
        return [];
    }

    // TODO: implement using ShipmentStatus OUTGOING tag.
    getOutgoing(): Shipment[] {
        return [];
    }

    getName(): string {
        return this.name;
    }

    getAddress(): string {
        return this.address;
    }
}