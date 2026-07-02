import { ShipmentStatus } from "../enums/ShipmentStatus";
import { SensorEvent } from "../events/SensorEvent";
import { ItemComponent } from "../models/ItemComponent";
import { Shipment } from "../models/Shipment";
import { Warehouse } from "../models/Warehouse";

// contains all permissable actions that can be done on the inventory.
export class InventorySystem {
    private warehouse: Warehouse;

    constructor(name: string, address: string) {
        this.warehouse = new Warehouse(name, address);
    }

    // the server calls on the InventorySystem to handle an update with
    // a specific event instance.
    // TODO: resolve what shipment to pass into process here.
    handleEvent(event: SensorEvent): void {
        event.process(this, new Shipment('templateShipment', 'inventory',
            'inventory', ShipmentStatus.INCOMING, new Date()));
    }

    // cannot add duplicate components
    // throws DuplicateItemError if shipment already added
    addShipment(shipment: Shipment): void {
        // stub
    }

    // cannot add duplicate components
    // throws DuplicateItemError if item component or shipment already added
    // TODO: consider adding Shipment ID attribute to pass ID rather than Shipment object.
    addComponentToShipment(component: ItemComponent, shipment: Shipment): void {
    }

    // throws NotFoundError if shipment not added
    removeShipment(shipment: Shipment): void {
    }

    // throws NotFoundError if item component or shipment not added
    // TODO: consider adding Shipment ID attribute to pass ID rather than Shipment object.
    removeComponentFromShipment(component: ItemComponent, shipment: Shipment): void {
    }

    // TODO: consider adding Shipment ID attribute to pass ID rather than Shipment object.
    getShipment(shipment: Shipment): Shipment {
        return shipment;
    }

    getShipments(): Shipment[] {
        return [];
    }

    getComponent(component: ItemComponent): ItemComponent {
        return component;
    }

    getComponents(): ItemComponent[] {
        return [];
    }

    getWareHouse(): Warehouse {
        return this.warehouse;
    }
}

// SensorEvent (interface) defines the sub-SensorEvent
// types (e.g. AddShipmenetEvent, AddItemEvent),
// and will have different implementations of inventory.process(this).
// The sub-Event types will call inventory.fn() for whatever action they
// describe inside of their process() function.
// The server will call inventory.handleEvent(event obj.), and then that event
// will call process (from Event supertype) with its own impl. that
// calls upon teh inventory system to do an action.
