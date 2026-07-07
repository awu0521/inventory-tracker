import { ShipmentStatus } from "../domain/enums/ShipmentStatus";
import { Shipment } from "../domain/models/Shipment";
import { ShipmentJSON } from "../domain/types/ShipmentJSON";
import { parseDate } from "./dateParser";

// converts JSON into a shipment object with the specified attributes.
export function parse(body: string): Shipment {

    try {
        JSON.parse(body);
    } catch (error) {
        console.log("Invalid JSON.");
    }

    const parsed: ShipmentJSON = JSON.parse(body);

    let status: ShipmentStatus = ShipmentStatus.PROCESSING;
    let name: string = '';
    let origin: string = '';
    let dest: string = '';
    let deadline: Date = new Date();

    // checks incoming vs !incoming (outgoing)
    if (parsed.innerSensor > parsed.outerSensor) status = ShipmentStatus.INCOMING;
    else status = ShipmentStatus.OUTGOING;

    // TODO: ensure new shipment object created matches existing shipment.
    //       consider changing inventorySystem.removeShipment() to remove shipment with simplay same name, etc.

    name = parsed.name;
    origin = parsed.origin;
    dest = parsed.dest;
    const deadlineNum = parseDate(parsed.deadline);

    // TODO: convert contents of shipment JSON data into item components inside of shipment
    // if (parsed.contents) parse item recursively (in case item is item container).

    // TODO: print shipment object inside of console to verify.

    let shipment: Shipment = new Shipment(name, origin, dest, status, deadlineNum);

    return shipment;
}