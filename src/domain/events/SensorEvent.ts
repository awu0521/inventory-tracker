import { InventorySystem } from "../inventory/InventorySystem"
import { Shipment } from "../models/Shipment";

// defines handler for different event types from the server.
export abstract class SensorEvent {

    abstract process(invSys: InventorySystem, shipment: Shipment): void;
}