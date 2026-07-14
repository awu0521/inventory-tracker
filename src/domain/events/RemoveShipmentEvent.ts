import { EventType } from "../enums/EventType";
import { InventorySystem } from "../inventory/InventorySystem";
import { Shipment } from "../models/Shipment";
import { SensorEvent } from "./SensorEvent";
import isEqual from 'lodash.isequal';

// event created when the server receives a request to remove a shipment.
export class RemoveShipmentEvent extends SensorEvent {

    process(invSys: InventorySystem, shipment: Shipment): void {
        try {
            for (const addedShipment of invSys.getShipments()) {
                // TODO: determine stronger equality check than name
                if (isEqual(shipment, addedShipment))  {
                    invSys.removeShipment(addedShipment);
                    this.logger.log(EventType.SUCCESSFUL_SHIPMENT_REMOVED);
                    return;
                }
            }
            this.logger.log(EventType.FAILED_NO_SHIPMENT_FOUND);
        } catch (e) {
            this.logger.log(EventType.FAILED_SHIPMENT_REMOVED);
        }
    }
}