import { ShipmentStatus } from "../domain/enums/ShipmentStatus";
import { Shipment } from "../domain/models/Shipment";

export function parse(body: JSON): Shipment {

    // TODO: check incoming vs !incoming (outgoing)
    // TODO: convert JSON data into shipment object
    // TODO: convert contents of shipment JSON data into item components inside of shipment
    // TODO: print shipment object inside of console to verify.

    return new Shipment('temp',
            'origin', 'dest', ShipmentStatus.INCOMING, new Date()) // stub
}