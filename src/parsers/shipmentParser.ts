import { ShipmentStatus } from "../domain/enums/ShipmentStatus";
import { Shipment } from "../domain/models/Shipment";

// converts JSON into a shipment object with the specified attributes.
export function parse(body: any): Shipment {

    try {
        JSON.parse(body);
    } catch (error) {
        console.log("Invalid JSON.");
    }

    const parsed = JSON.parse(body);

    let shipment: Shipment = new Shipment('name', 'origin', 'dest', ShipmentStatus.PROCESSING, new Date());

    // TODO: ensure that parsed elements are not of type any.

    // checks incoming vs !incoming (outgoing)
    if (parsed.innerSensor > parsed.outerSensor) shipment.setStatus(ShipmentStatus.INCOMING);
    else shipment.setStatus(ShipmentStatus.OUTGOING);
    
    // TODO: convert JSON data into shipment object
    // get JSON elements and set shipment attributes.

    // TODO: convert contents of shipment JSON data into item components inside of shipment
    // if (parsed.contents) parse item recursively (in case item is item container).

    // TODO: print shipment object inside of console to verify.

    return shipment;
}