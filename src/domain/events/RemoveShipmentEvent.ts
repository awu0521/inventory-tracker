import { InventorySystem } from "../inventory/InventorySystem";
import { Shipment } from "../models/Shipment";
import { SensorEvent } from "./SensorEvent";

// event created when the server receives a request to remove a shipment.
export class RemoveShipmentEvent extends SensorEvent {

    process(invSys: InventorySystem, shipment: Shipment): void {
        invSys.removeShipment(shipment);
    }
}