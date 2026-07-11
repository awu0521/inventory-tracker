import { EventLogger } from "../../services/EventLogger";
import { InventorySystem } from "../inventory/InventorySystem"
import { Shipment } from "../models/Shipment";

// defines handler for different event types from the server.
export abstract class SensorEvent {
    protected logger: EventLogger = new EventLogger();

    abstract process(invSys: InventorySystem, shipment: Shipment): void;
}