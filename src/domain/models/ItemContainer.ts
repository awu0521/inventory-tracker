import { Dimensions } from "../types/Dimensions";
import { ItemType } from "../enums/ItemType";
import { ItemComponent } from "./ItemComponent";
import { DuplicateError } from "../errors/DuplicateError";
import { NotFoundError } from "../errors/NotFoundError";

// Collection of items contained within container or shipment object.
export class ItemContainer extends ItemComponent {
    private components: ItemComponent[] = [];

    constructor(name: string, weight: number, type: ItemType,
        dimensions: Dimensions, desc?: string) {
        super(name, weight, type, dimensions, desc);
    }

    // cannot add duplicate components
    // throws DuplicateItemError if item component already added
    add(component: ItemComponent): void {
        if (this.components.indexOf(component) === -1) this.components.push(component);
        else throw new DuplicateError('Cannot add duplicate item components.');
    }

    // throws NotFoundError if item component not added
    remove(component: ItemComponent): void {
        const index = this.components.indexOf(component);

        if (index === -1) throw new NotFoundError('Cannot remove unadded item component.');
        else this.components.splice(index, 1);
    }

    // gets the total weight of itself and all contained components.
    getTotalWeight(): number {
        let total = 0;

        this.components.forEach((c: ItemComponent) => {
            total += c.getTotalWeight();
        });

        return this.weight + total;
    }

    getComponents(): ItemComponent[] {
        return this.components;
    }
}