import { ItemComponentJSON } from "./ItemComponentJSON";

export interface ShipmentJSON {
        name: string,
        contents: Array<ItemComponentJSON>,
        origin: string,
        dest: string,
        status: string,
        deadline: string
    };