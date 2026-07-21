import { DuplicateError } from "../errors/DuplicateError";
import { NotFoundError } from "../errors/NotFoundError";
import { ItemComponent } from "../models/ItemComponent";

export class ItemComponentQueue {
    private components: ItemComponent[] = [];

    getQueue(): ItemComponent[] {
        return this.components;
    }
    
    // cannot add duplicate component
    // throws DuplicateItemError if component already added
    add(component: ItemComponent): void {
        if (this.components.indexOf(component) === -1) this.components.push(component);
        else throw new DuplicateError('Cannot add duplicate shipments.');
    }

    // throws NotFoundError if component not added
    remove(component: ItemComponent): void {
        const index = this.components.indexOf(component);

        if (index === -1) throw new NotFoundError('Cannot remove unadded shipment.');
        else this.components.splice(index, 1);
    }
}