import { InventorySystem } from "../inventory/InventorySystem"
import { Shipment } from "../models/Shipment";

// defines handler for different event types from the server.
export abstract class SensorEvent {

    abstract process(invSys: InventorySystem, shipment: Shipment): void;
}

// NOTE: the shipment passed into process() when a shipment comes in is a blank
// shipment (the system shouldnt know the contents of a new shipment).
// Once it has entered the warehouse, only then is it populated with item
// components. This solves the issue of coupling the sensor to the Shipment
// class, as we no longer need the sensor to know the contents of the shipment,
// and it solves the use case of invSys.addComponentToShipment().