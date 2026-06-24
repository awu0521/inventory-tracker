import { ItemType } from "../enums/ItemType.ts";
import { Dimensions } from "../types/Dimensions.ts";
import { ItemComponent } from "./ItemComponent.ts";

// Individual item contained within container or shipment object.
export class Item extends ItemComponent {
    constructor(name: string, weight: number, type: ItemType,
        dimensions: Dimensions, desc?: string) {
        super(name, weight, type, dimensions, desc);
    }

    getTotalWeight() {
        return this.weight;
    }
}