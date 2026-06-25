import { Dimensions } from "../types/Dimensions";
import { ItemType } from "../enums/ItemType";
import { ItemComponent } from "./ItemComponent";

// Collection of items contained within container or shipment object.
export class ItemContainer extends ItemComponent {
    components: ItemComponent[] = [];

    constructor(name: string, weight: number, type: ItemType,
        dimensions: Dimensions, desc?: string) {
        super(name, weight, type, dimensions, desc);
    }

    // cannot add duplicate components
    add(component: ItemComponent): void {
        // stub
    }

    remove(component: ItemComponent): void {
        // stub
    }

    // TODO: implement by getting total weight of all contained components.
    getTotalWeight(): number {
        return 0;
    }

    getComponents(): ItemComponent[] {
        return this.components;
    }
}