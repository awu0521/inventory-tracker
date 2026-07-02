import { EventType } from "../enums/EventType";
import { InventorySystem } from "../inventory/InventorySystem";
import { Shipment } from "../models/Shipment";
import { SensorEvent } from "./SensorEvent";

// event created when the server receives a request to add a shipment.
export class AddShipmentEvent extends SensorEvent {

    process(invSys: InventorySystem, shipment: Shipment): void {
        try {
            invSys.addShipment(shipment);
            this.logger.log(EventType.SUCCESSFUL_SHIPMENT_ADDED);
        } catch (e) {
            this.logger.log(EventType.FAILED_SHIPMENT_ADDED);
        }
    }
}