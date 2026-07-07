export interface ShipmentJSON {
        innerSensor: number,
        outerSensor: number,
        name: string,
        contents: Array<JSON>,
        origin: string,
        dest: string,
        status: string,
        deadline: string
    };