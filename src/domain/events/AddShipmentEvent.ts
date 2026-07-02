import { InventorySystem } from "../inventory/InventorySystem";
import { Shipment } from "../models/Shipment";
import { SensorEvent } from "./SensorEvent";

// event created when the server receives a request to add a shipment.
export class AddShipmentEvent extends SensorEvent {

    process(invSys: InventorySystem, shipment: Shipment): void {
        invSys.addShipment(shipment);
    }
}