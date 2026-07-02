import { ItemType } from "../enums/ItemType.js";
import { Dimensions } from "../types/Dimensions.js";

// General type for all shipment objects in inventory.
// All shipment objects carry these properties.
export abstract class ItemComponent {
    protected name: string;
    protected weight: number;
    protected type: ItemType;
    protected dimensions: Dimensions;
    protected desc: string | undefined;

    constructor(name: string, weight: number, type: ItemType,
        dimensions: Dimensions, desc?: string) {
        this.name = name;
        this.weight = weight;
        this.type = type;
        this.dimensions = dimensions;
        this.desc = desc;
    }

    abstract getTotalWeight(): number;
    
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