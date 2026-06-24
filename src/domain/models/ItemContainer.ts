import { Dimensions } from "../types/Dimensions.ts";
import { ItemType } from "../enums/ItemType.ts";
import { ItemComponent } from "./ItemComponent";

// Collection of items contained within container or shipment object.
export class ItemContainer extends ItemComponent {
    components: ItemComponent[];

    constructor(name: string, weight: number, type: ItemType,
        dimensions: Dimensions, desc?: string) {
        super(name, weight, type, dimensions, desc);
    }

    // TODO: implement by getting total weight of all contained components.
    getTotalWeight(): number {
        return 0;
    }

    add(): void {
        // stub
    }

    remove(): void {
        // stub
    }
}