import { ShipmentStatus } from "../enums/ShipmentStatus";
import { DuplicateError } from "../errors/DuplicateError";
import { InvalidStatusError } from "../errors/InvalidStatusError";
import { NotFoundError } from "../errors/NotFoundError";
import { ItemComponent } from "./ItemComponent";

export class Shipment {
    private name: string;
    private contents: ItemComponent[] = [];
    private origin: string;
    private dest: string;
    private status: ShipmentStatus;
    private deadline: Date; // YYYY, MM, DD

    constructor(name: string, origin: string, dest: string,
        status: ShipmentStatus, deadline: Date) {
            this.name = name;
            this.origin = origin;
            this.dest = dest;
            this.status = status;
            this.deadline = deadline;
        }

    // cannot add duplicate components
    // throws DuplicateItemError if item component already added
    add(component: ItemComponent): void {
        if (this.contents.indexOf(component) === -1) this.contents.push(component);
        else throw new DuplicateError('Cannot add duplicate item components.');
    }

    // throws NotFoundError if item component not added
    remove(component: ItemComponent): void {
        const index = this.contents.indexOf(component);

        if (index === -1) throw new NotFoundError('Cannot remove un-added item component.');
        else this.contents.splice(index, 1);
    }

    // cannot update the status to incoming
    setStatus(status: ShipmentStatus): void {
        if ((this.status !== ShipmentStatus.INCOMING &&
            this.status !== ShipmentStatus.PROCESSING) &&
            status === ShipmentStatus.INCOMING) throw new InvalidStatusError('Cannot revert status to INCOMING.');
        else this.status = status;
    }

    setDeadline(deadline: Date): void {
        this.deadline = deadline;
    }

    setDest(dest: string): void {
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