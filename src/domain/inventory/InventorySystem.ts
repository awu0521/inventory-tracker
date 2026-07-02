import { ShipmentStatus } from "../enums/ShipmentStatus";
import { DuplicateError } from "../errors/DuplicateError";
import { NotFoundError } from "../errors/NotFoundError";
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
        if (this.warehouse.getStorage().indexOf(shipment) === -1) this.warehouse.add(shipment);
        else throw new DuplicateError('Cannot add duplicate shipments.');
    }

    // cannot add duplicate components
    // throws DuplicateItemError if item component or shipment already added
    // TODO: consider adding Shipment ID attribute to pass ID rather than Shipment object.
    addComponentToShipment(component: ItemComponent, shipment: Shipment): void {
        if (shipment.getContents().indexOf(component) === -1) shipment.add(component);
        else throw new DuplicateError('Cannot add duplicate item components.');
    }

    // throws NotFoundError if shipment not added
    removeShipment(shipment: Shipment): void {
        const index = this.warehouse.getStorage().indexOf(shipment);
        
        if (index === -1) throw new NotFoundError('Cannot remove unadded item component.');
        else this.warehouse.remove(shipment);
    }

    // throws NotFoundError if item component or shipment not added
    // TODO: consider adding Shipment ID attribute to pass ID rather than Shipment object.
    removeComponentFromShipment(component: ItemComponent, shipment: Shipment): void {
        const index = shipment.getContents().indexOf(component);
        
        if (index === -1) throw new NotFoundError('Cannot remove unadded item component.');
        else shipment.remove(component);
    }

    // TODO: consider adding Shipment ID attribute to pass ID rather than Shipment object.
    getShipment(shipment: Shipment): Shipment {
        return shipment;
    }

    getShipments(): Shipment[] {
        return this.warehouse.getStorage();
    }

    getComponent(component: ItemComponent): ItemComponent {
        return component;
    }

    getComponents(): ItemComponent[] {
        let components: ItemComponent[] = [];

        this.warehouse.getStorage().forEach(shipment => {
            shipment.getContents().forEach(component => {
                components.push(component);
            });
        });

        return components;
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
