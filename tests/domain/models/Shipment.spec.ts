import { ItemType } from "../../../src/domain/enums/ItemType";
import { ShipmentStatus } from "../../../src/domain/enums/ShipmentStatus";
import { ItemComponent } from "../../../src/domain/models/ItemComponent";
import { ItemContainer } from "../../../src/domain/models/ItemContainer";
import { Shipment } from "../../../src/domain/models/Shipment";
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
        shipment.add(component1);
        expect(shipment.getContents().length).to.eq(1);
        shipment.add(component1);
        expect(shipment.getContents().length).to.eq(1);
    });

    it('should remove a component', () => {
        shipment.add(component1);
        expect(shipment.getContents().length).to.eq(1);
        shipment.remove(component1);
        expect(shipment.getContents().length).to.eq(0);
    });

    it('should remove multiple components', () => {
        shipment.add(component1);
        shipment.add(component2);
        expect(shipment.getContents().length).to.eq(2);
        shipment.remove(component1);
        expect(shipment.getContents().length).to.eq(1);
        shipment.remove(component1);
        expect(shipment.getContents().length).to.eq(0);
    });

    it('should not remove a non-existing component', () => {
        shipment.add(component1);
        expect(shipment.getContents().length).to.eq(1);
        shipment.remove(component2);
        expect(shipment.getContents().length).to.eq(1);
    });

    it('should update the status', () => {
        shipment.setStatus(ShipmentStatus.OUTGOING);
        expect(shipment.getStatus).to.eq(ShipmentStatus.OUTGOING);
    });

    it('should not update the status to incoming', () => {
        shipment.setStatus(ShipmentStatus.OUTGOING);
        expect(shipment.getStatus).to.eq(ShipmentStatus.OUTGOING);
        shipment.setStatus(ShipmentStatus.INCOMING);
        expect(shipment.getStatus).to.eq(ShipmentStatus.OUTGOING);
    });

    it('should update the deadline', () => {
        shipment.setDeadline(new Date(4, 2, 2028));
        expect(shipment.getDeadline().getDay()).to.eq(2);
        expect(shipment.getDeadline().getMonth).to.eq(4);
        expect(shipment.getDeadline().getFullYear()).to.eq(2028);
    });

    it('should update the destination', () => {
        shipment.setDest("new dest");
        expect(shipment.getDest()).to.eq("new dest");
    });
});