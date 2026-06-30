import { InventorySystem } from "../../../src/domain/inventory/InventorySystem"

describe('InventorySystem', () => {
    let invSys: InventorySystem;

    beforeEach(() => {
        invSys = new InventorySystem('warehouse', 'test st.');
    });

    it('should add a shipment', () => {

    });

    it('should add multiple shipments', () => {

    });

    it('should not add a duplicate shipment', () => {

    });

    it('should add a component to a shipment', () => {

    });

    it('should add multiple components to a shipments', () => {

    });

    it('should not add a duplicate component to a shipment', () => {

    });

    it('should remove a shipment', () => {

    });

    it('should remove multiple shipments', () => {

    });

    it('should not remove a non-existing shipment', () => {

    });

    it('should remove component from a shipment', () => {

    });

    it('should remove multiple components from a shipment', () => {

    });

    it('should not remove a non-existing component from a shipment', () => {

    });
});