import { ShipmentStatus } from "../enums/ShipmentStatus";
import { ItemComponent } from "./ItemComponent";

export class Shipment {
    private name: string;
    private contents: ItemComponent[] = [];
    private origin: string;
    private dest: string;
    private status: ShipmentStatus;
    private deadline: Date;

    constructor(name: string, origin: string, dest: string,
        status: ShipmentStatus, deadline: Date) {
            this.name = name;
            this.origin = origin;
            this.dest = dest;
            this.status = status;
            this.deadline = deadline;
        }

    // cannot add duplicate components
    add(component: ItemComponent): void {
        // stub
    }

    remove(component: ItemComponent): void {
        // stub
    }

    // cannot update the status to incoming
    setStatus(status: ShipmentStatus) {
        this.status = status;
    }

    setDeadline(deadline: Date) {
        this.deadline = deadline;
    }

    setDest(dest: string) {
        this.dest = dest;
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