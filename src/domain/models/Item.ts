import { ItemType } from "../enums/ItemType";
import { Dimensions } from "../types/Dimensions";
import { ItemComponent } from "./ItemComponent";

// Individual item contained within container or shipment object.
export class Item extends ItemComponent {
    constructor(name: string, weight: number, type: ItemType,
        dimensions: Dimensions, desc?: string) {
        super(name, weight, type, dimensions, desc);
    }

    getTotalWeight(): number {
        return this.weight;
    }
}