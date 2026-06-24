import { ItemType } from "../enums/ItemType.ts";
import { Dimensions } from "../types/Dimensions.ts";

// General type for all shipment objects in inventory.
// All shipment objects carry these properties.
export abstract class ItemComponent {
    name: string;
    weight: number;
    type: ItemType;
    dimensions: Dimensions;
    desc: string | undefined;

    constructor(name: string, weight: number, type: ItemType,
        dimensions: Dimensions, desc?: string) {
        this.name = name;
        this.weight = weight;
        this.type = type;
        this.dimensions = dimensions;
        this.desc = desc;
    }

    abstract getTotalWeight();
    
    getName(): string {
        return this.name;
    }

    getType(): ItemType {
        return this.type;
    }

    getDimensions(): Dimensions {
        return this.dimensions;
    }

    getDesc(): string {
        return this.desc ? this.desc : "No description provided.";
    }

}