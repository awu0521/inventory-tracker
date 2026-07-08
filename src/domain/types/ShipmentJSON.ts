import { ItemComponentJSON } from "./ItemComponentJSON";

export interface ShipmentJSON {
        innerSensor: number,
        outerSensor: number,
        name: string,
        contents: Array<ItemComponentJSON>,
        origin: string,
        dest: string,
        status: string,
        deadline: string
    };