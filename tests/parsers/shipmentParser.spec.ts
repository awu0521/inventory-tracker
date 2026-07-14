import { incomingShipment, invalidShipment, outgoingShipment, populatedShipment } from "../fixtures/shipments";
import { parseShipment } from "../../src/parsers/shipmentParser";
import { expect } from "chai";
import { Shipment } from "../../src/domain/models/Shipment";
import { parseComponent } from "../../src/parsers/itemComponentParser";
import { testItem1, testItem2 } from "../fixtures/items";
import { ShipmentStatus } from "../../src/domain/enums/ShipmentStatus";
import { parseDate } from "../../src/parsers/dateParser";
import { testContainer1 } from "../fixtures/itemContainers";

describe('shipmentParser', () => {

    it('should throw when parsing invalid Shipment JSON', () => {
        try {
            parseShipment(invalidShipment);
            expect.fail('Should have thrown.');
        } catch (e) {}
    });

    it('should parse valid Shipment JSON as INCOMING', () => {
        const shipment: Shipment = parseShipment(incomingShipment);

        expect(shipment.getName() === incomingShipment.name);
        expect(shipment.getContents()).to.deep.eq([parseComponent(testItem1)]);
        expect(shipment.getOrigin() === incomingShipment.origin);
        expect(shipment.getDest() === incomingShipment.dest);
        expect(shipment.getStatus() === ShipmentStatus.INCOMING);
        expect(shipment.getDeadline() === parseDate(incomingShipment.deadline));
    });

    it('should parse valid Shipment JSON as OUTGOING', () => {
        const shipment: Shipment = parseShipment(outgoingShipment);

        expect(shipment.getName() === incomingShipment.name);
        expect(shipment.getContents()).to.deep.eq([parseComponent(testItem1)]);
        expect(shipment.getOrigin() === incomingShipment.origin);
        expect(shipment.getDest() === incomingShipment.dest);
        expect(shipment.getStatus() === ShipmentStatus.OUTGOING);
        expect(shipment.getDeadline() === parseDate(incomingShipment.deadline));
    });

    it('should parse valid Shipment JSON with Item Components', () => {
        const shipment: Shipment = parseShipment(populatedShipment);

        expect(shipment.getName() === incomingShipment.name);
        expect(shipment.getContents()).to.deep.eq([parseComponent(testContainer1),
            parseComponent(testItem1),
            parseComponent(testItem2)]);
        expect(shipment.getOrigin() === incomingShipment.origin);
        expect(shipment.getDest() === incomingShipment.dest);
        expect(shipment.getStatus() === ShipmentStatus.INCOMING);
        expect(shipment.getDeadline() === parseDate(incomingShipment.deadline));
    });
});