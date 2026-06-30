import { InventorySystem } from "../inventory/InventorySystem"

// defines handler for different event types from the server.
export interface SensorEvent {

    process(invSys: InventorySystem): void;
}