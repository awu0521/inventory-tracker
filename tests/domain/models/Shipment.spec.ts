import { ItemType } from "../../../src/domain/enums/ItemType.js";
import { ShipmentStatus } from "../../../src/domain/enums/ShipmentStatus.js";
import { ItemComponent } from "../../../src/domain/models/ItemComponent.js";
import { ItemContainer } from "../../../src/domain/models/ItemContainer.js";
import { Shipment } from "../../../src/domain/models/Shipment.js";
import { expect } from "chai";

describe('Shipment', () => {
    let shipment: Shipment;
    let component1: ItemComponent;
    let component2: ItemComponent;

    before(() => {
        component1 = new ItemContainer('c1', 1,
            ItemType.BULK, {length: 1, width: 1, height: 1});
        component2 = new ItemContainer('c2', 2,
            ItemType.DOCUMENT, {length: 2, width: 2, height: 2});
    });


    beforeEach(() => {
        shipment = new Shipment('shipment', 'from', 'to',
            ShipmentStatus.INCOMING, new Date(1, 1, 2026));
    });

    it('should add a component', () => {
        shipment.add(component1);
        expect(shipment.getContents().length).to.eq(1);
    });

    it('should add multiple components', () => {
        shipment.add(component1);
        shipment.add(component2);
        expect(shipment.getContents().length).to.eq(2);
    });

    it('should not add duplicate components', () => {
        try {
            shipment.add(component1);
            expect(shipment.getContents().length).to.eq(1);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }

        try {
            shipment.add(component1);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(shipment.getContents().length).to.eq(1);
        }
    });

    it('should remove a component', () => {
        try {
            shipment.add(component1);
            expect(shipment.getContents().length).to.eq(1);
            shipment.remove(component1);
            expect(shipment.getContents().length).to.eq(0);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }
    });

    it('should remove multiple components', () => {
        try {
            shipment.add(component1);
            shipment.add(component2);
            expect(shipment.getContents().length).to.eq(2);
            shipment.remove(component1);
            expect(shipment.getContents().length).to.eq(1);
            shipment.remove(component2);
            expect(shipment.getContents().length).to.eq(0);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }
    });

    it('should not remove a non-existing component', () => {
        try {
            shipment.add(component1);
            expect(shipment.getContents().length).to.eq(1);
            shipment.remove(component2);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(shipment.getContents().length).to.eq(1);
        }
    });

    it('should update the status', () => {
        shipment.setStatus(ShipmentStatus.OUTGOING);
        expect(shipment.getStatus()).to.eq(ShipmentStatus.OUTGOING);
    });

    it('should not update the status to incoming', () => {
        try {
            shipment.setStatus(ShipmentStatus.OUTGOING);
            expect(shipment.getStatus()).to.eq(ShipmentStatus.OUTGOING);
            shipment.setStatus(ShipmentStatus.INCOMING);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(shipment.getStatus( )).to.eq(ShipmentStatus.OUTGOING);
        }
    });

    it('should update the deadline', () => {
        shipment.setDeadline(new Date(2028, 3, 2));
        expect(shipment.getDeadline().getDate()).to.eq(2);
        expect(shipment.getDeadline().getMonth()).to.eq(3);
        expect(shipment.getDeadline().getFullYear()).to.eq(2028);
    });

    it('should update the destination', () => {
        shipment.setDest("new dest");
        expect(shipment.getDest()).to.eq("new dest");
    });
});