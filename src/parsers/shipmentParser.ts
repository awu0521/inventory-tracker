import { ShipmentStatus } from "../domain/enums/ShipmentStatus";
import { ItemComponent } from "../domain/models/ItemComponent";
import { Shipment } from "../domain/models/Shipment";
import { ShipmentJSON } from "../domain/types/ShipmentJSON";
import { parseDate } from "./dateParser";
import { parseComponent } from "./itemComponentParser";

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

    // checks incoming vs !incoming (outgoing)
    if (parsed.innerSensor > parsed.outerSensor) status = ShipmentStatus.INCOMING;
    else status = ShipmentStatus.OUTGOING;

    // TODO: ensure new shipment object created matches existing shipment.
    //       consider changing inventorySystem.removeShipment() to remove shipment with simplay same name, etc.

    name = parsed.name;
    origin = parsed.origin;
    dest = parsed.dest;
    let deadlineNum: Date = new Date();
    try {
        deadlineNum = parseDate(parsed.deadline);
    } catch (e) {}

    let shipment: Shipment = new Shipment(name, origin, dest, status, deadlineNum);

    for (const component of parsed.contents) {
        let itemComponent: ItemComponent = parseComponent(component);
        shipment.add(itemComponent);
    }

    return shipment;
}