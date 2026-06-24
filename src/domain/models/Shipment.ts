import { ShipmentStatus } from "../enums/ShipmentStatus";
import { ItemComponent } from "./ItemComponent";

export class Shipment {
    name: string;
    contents: ItemComponent[];
    origin: string;
    dest: string;
    status: ShipmentStatus;
    deadline: Date;

    constructor(name: string, contents: ItemComponent[], origin: string,
        dest: string, status: ShipmentStatus, deadline: Date) {
            this.name = name;
            this.contents = contents;
            this.origin = origin;
            this.dest = dest;
            this.status = status;
            this.deadline = deadline;
        }

    add(): void {
        // stub
    }

    remove(): void {
        // stub
    }

    getName(): string {
        return this.name;
    }

    getContents(): ItemComponent[] {
        return this.contents;
    }

    getOrigin(): string {
        return this.origin;
    }

    getDest(): string {
        return this.dest;
    }

    getStatus(): ShipmentStatus {
        return this.status;
    }

    getDeadline(): Date {
        return this.deadline;
    }
}