import { ShipmentStatus } from "../domain/enums/ShipmentStatus";
import { InvalidShipmentError } from "../domain/errors/InvalidShipmentError";
import { ItemComponent } from "../domain/models/ItemComponent";
import { Shipment } from "../domain/models/Shipment";
import { ShipmentJSON } from "../domain/types/ShipmentJSON";
import { parseDate } from "./dateParser";
import { parseComponent } from "./itemComponentParser";

// converts JSON into a shipment object with the specified attributes.
export function parseShipment(body: any): Shipment {

    if (!isShipmentJSON(body)) throw new InvalidShipmentError("Not valid Shipment JSON");

    const parsed: ShipmentJSON = body as ShipmentJSON;

    let status: ShipmentStatus = ShipmentStatus.INCOMING;
    let name: string = '';
    let origin: string = '';
    let dest: string = '';

    name = parsed.name;
    origin = parsed.origin;
    dest = parsed.dest;
    let deadlineNum: Date = new Date();
    try {
        deadlineNum = parseDate(parsed.deadline);
    } catch (e) {}

    let shipment: Shipment = new Shipment(name, origin, dest, status, deadlineNum);

    // TODO: in test suite, add test for malformed ItemComponentJSON
    for (const component of parsed.contents) {
        let itemComponent: ItemComponent = parseComponent(component);
        shipment.add(itemComponent);
    }

    return shipment;
}

function isShipmentJSON(body: any): boolean {
    return body &&
        typeof body.name === "string" &&
        Array.isArray(body.contents) &&
        typeof body.origin === "string" &&
        typeof body.dest === "string" &&
        typeof body.status === "string" &&
        typeof body.deadline === "string";
}