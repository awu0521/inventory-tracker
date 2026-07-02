import { expect } from "chai";
import { ItemType } from "../../../src/domain/enums/ItemType.js";
import { ShipmentStatus } from "../../../src/domain/enums/ShipmentStatus.js";
import { InventorySystem } from "../../../src/domain/inventory/InventorySystem.js"
import { ItemComponent } from "../../../src/domain/models/ItemComponent.js";
import { ItemContainer } from "../../../src/domain/models/ItemContainer.js";
import { Shipment } from "../../../src/domain/models/Shipment.js";

describe('InventorySystem', () => {
    let invSys: InventorySystem;
    let shipment1: Shipment;
    let shipment2: Shipment;
    let component1: ItemComponent;
    let component2: ItemComponent;

    before(() => {
        shipment1 = new Shipment('s1', 'from1', 'to1',
            ShipmentStatus.INCOMING, new Date(1, 1, 2026));
        shipment2 = new Shipment('s2', 'from2', 'to2',
            ShipmentStatus.OUTGOING, new Date(12, 12, 2030));
        component1 = new ItemContainer('c1', 1,
            ItemType.BULK, {length: 1, width: 1, height: 1});
        component2 = new ItemContainer('c2', 2,
            ItemType.DOCUMENT, {length: 2, width: 2, height: 2});
    });

    beforeEach(() => {
        invSys = new InventorySystem('warehouse', 'test st.');
    });

    it('should add a shipment', () => {
        invSys.addShipment(shipment1);
        expect(invSys.getShipments().length).to.eq(1);

    });

    it('should add multiple shipments', () => {
        invSys.addShipment(shipment1);
        invSys.addShipment(shipment2);
        expect(invSys.getShipments().length).to.eq(2);
    });

    it('should not add a duplicate shipment', () => {
        try {
            invSys.addShipment(shipment1);
            expect(invSys.getShipments().length).to.eq(1);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }

        try {
            invSys.addShipment(shipment1);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(invSys.getShipments().length).to.eq(1);
        }
    });

    it('should add a component to a shipment', () => {
        invSys.addShipment(shipment1);
        invSys.addComponentToShipment(component1, shipment1);
        expect(invSys.getShipment(shipment1).getContents().length).to.eq(1);
    });

    it('should add multiple components to a shipments', () => {
        invSys.addShipment(shipment1);
        invSys.addComponentToShipment(component1, shipment1);
        invSys.addComponentToShipment(component2, shipment2);
        expect(invSys.getShipment(shipment1).getContents().length).to.eq(2);
    });

    it('should not add a duplicate component to a shipment', () => {
        invSys.addShipment(shipment1);

        try {
            invSys.addComponentToShipment(component1, shipment1);
            expect(invSys.getShipment(shipment1).getContents().length).to.eq(1);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }

        try {
            invSys.addComponentToShipment(component1, shipment1);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(invSys.getShipment(shipment1).getContents().length).to.eq(1);
        }
    });

    it('should remove a shipment', () => {
        try {
            invSys.addShipment(shipment1);
            expect(invSys.getShipments().length).to.eq(1);
            invSys.removeShipment(shipment1);
            expect(invSys.getShipments().length).to.eq(0);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }
    });

    it('should remove multiple shipments', () => {
        try {
            invSys.addShipment(shipment1);
            invSys.addShipment(shipment2);
            expect(invSys.getShipments().length).to.eq(2);
            invSys.removeShipment(shipment1);
            expect(invSys.getShipments().length).to.eq(1);
            invSys.removeShipment(shipment2);
            expect(invSys.getShipments().length).to.eq(0);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }
    });

    it('should not remove a non-existing shipment', () => {
        try {
            invSys.addShipment(shipment1);
            expect(invSys.getShipments().length).to.eq(1);
            invSys.removeShipment(shipment2);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(invSys.getShipments().length).to.eq(1);
        }
    });

    it('should remove component from a shipment', () => {
        invSys.addShipment(shipment1);

        try {
            invSys.addComponentToShipment(component1, shipment1);
            expect(invSys.getShipment(shipment1).getContents().length).to.eq(1);
            invSys.removeComponentFromShipment(component1, shipment1);
            expect(invSys.getShipment(shipment1).getContents().length).to.eq(0);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }
    });

    it('should remove multiple components from a shipment', () => {
        invSys.addShipment(shipment1);

        try {
            invSys.addComponentToShipment(component1, shipment1);
            invSys.addComponentToShipment(component2, shipment1);
            expect(invSys.getShipment(shipment1).getContents().length).to.eq(2);
            invSys.removeComponentFromShipment(component1, shipment1);
            expect(invSys.getShipment(shipment1).getContents().length).to.eq(1);
            invSys.removeComponentFromShipment(component2, shipment1);
            expect(invSys.getShipment(shipment1).getContents().length).to.eq(0);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }
    });

    it('should not remove a non-existing component from a shipment', () => {
        invSys.addShipment(shipment1);

        try {
            invSys.addComponentToShipment(component1, shipment1);
            expect(invSys.getShipment(shipment1).getContents().length).to.eq(1);
            invSys.removeComponentFromShipment(component2, shipment1);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect.fail('Should not have thrown.');
            expect(invSys.getShipment(shipment1).getContents().length).to.eq(1);
        }
    });
});