import { ShipmentStatus } from "../../../src/domain/enums/ShipmentStatus";
import { Shipment } from "../../../src/domain/models/Shipment";
import { Warehouse } from "../../../src/domain/models/Warehouse";
import { expect } from "chai";

describe('Warehouse', () => {
    let warehouse: Warehouse;
    let shipment1: Shipment;
    let shipment2: Shipment;

    before(() => {
        shipment1 = new Shipment('s1', 'from1', 'to1',
            ShipmentStatus.INCOMING, new Date(1, 1, 2026));
        shipment2 = new Shipment('s2', 'from2', 'to2',
            ShipmentStatus.OUTGOING, new Date(12, 12, 2030));
    });

    beforeEach(() => {
        warehouse = new Warehouse('warehouse', 'test st.')
    });

    it('should add a shipment', () => {
        warehouse.add(shipment1);
        expect(warehouse.getIncoming().length).to.eq(1);
    });

    it('should add multiple shipments', () => {
        warehouse.add(shipment1);
        warehouse.add(shipment2);
        expect(warehouse.getIncoming().length).to.eq(1);
        expect(warehouse.getOutgoing().length).to.eq(1);
    });

    it('should not add duplicate shipments', () => {
        try {
            warehouse.add(shipment1);
            expect(warehouse.getIncoming().length).to.eq(1);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }

        try {
            warehouse.add(shipment1);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(warehouse.getIncoming().length).to.eq(1);
        }
    });

    it('should remove a shipment', () => {
        warehouse.add(shipment1);
        expect(warehouse.getIncoming().length).to.eq(1);
        warehouse.remove(shipment1);
        expect(warehouse.getIncoming().length).to.eq(0);
    });

    it('should remove multiple shipments', () => {
        warehouse.add(shipment1);
        warehouse.add(shipment2);
        expect(warehouse.getIncoming().length).to.eq(1);
        expect(warehouse.getIncoming().length).to.eq(1);
        warehouse.remove(shipment1);
        expect(warehouse.getIncoming().length).to.eq(0);
        warehouse.remove(shipment2);
        expect(warehouse.getOutgoing().length).to.eq(0);
    });

    it('should not remove a non-existing shipment', () => {
        try {
            warehouse.add(shipment1);
            expect(warehouse.getIncoming().length).to.eq(1);
            warehouse.remove(shipment2);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(warehouse.getIncoming().length).to.eq(1);
        }
    });

    it('should be instantiated with its specified elements', () => {
        expect(warehouse.getName().length).to.eq('warehouse');
        expect(warehouse.getAddress().length).to.eq('test st.');
    });
});