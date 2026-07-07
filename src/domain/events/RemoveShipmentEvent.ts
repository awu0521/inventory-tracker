import { EventType } from "../enums/EventType";
import { InventorySystem } from "../inventory/InventorySystem";
import { Shipment } from "../models/Shipment";
import { SensorEvent } from "./SensorEvent";

// event created when the server receives a request to remove a shipment.
export class RemoveShipmentEvent extends SensorEvent {

    process(invSys: InventorySystem, shipment: Shipment): void {
        // TODO: ensure new shipment object created matches existing shipment.
        try {
            invSys.removeShipment(shipment);
            this.logger.log(EventType.SUCCESSFUL_SHIPMENT_REMOVED);
        } catch (e) {
            this.logger.log(EventType.FAILED_SHIPMENT_REMOVED);
        }
    }
}