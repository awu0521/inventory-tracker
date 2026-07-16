import { AddShipmentEvent } from "../../domain/events/AddShipmentEvent";
import { RemoveShipmentEvent } from "../../domain/events/RemoveShipmentEvent";
import { InventorySystem } from "../../domain/inventory/InventorySystem";
import { Shipment } from "../../domain/models/Shipment";
import type { Request, Response } from "express";
import { parseShipment } from "../../parsers/shipmentParser";
import { SensorEvent } from "../../domain/events/SensorEvent";
import { ShipmentStatus } from "../../domain/enums/ShipmentStatus";

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let invSys: InventorySystem;

function start() {
    // TODO: add client logic to create inventory system rather
    // than inside of server.
    invSys = new InventorySystem('system', 'warehouse');
}

app.get('/', (req: Request, res: Response) => {
    res.send("Server is running.");
});

app.post('/sensor', (req: Request, res: Response) => {
    try {
        // TODO: pass data to an adapter that converts JSON to uniform format.
        // TODO: add checks for unpopulated shipment objects
        // TODO: allow user/importer to instantiate shipments and item components.
        let outgoing: boolean = false;

        let shipment: Shipment = parseShipment(req.body);
        // if invSys already contains a shipment of that name, the shipment is outgoing
        outgoing = invSys.isSameShipment(shipment);

        // NOTE: if RemoveShipmentEvent, it should be a shipment that the warehouse contains,
        // so we should update that specific shipment, not a new shipment object.
        const event: SensorEvent = outgoing ? new RemoveShipmentEvent() : new AddShipmentEvent();

        invSys.handleEvent(event, shipment);

        if (outgoing) shipment.setStatus(ShipmentStatus.OUTGOING);
        else shipment.setStatus(ShipmentStatus.INCOMING);
        
        res.status(200).json({ message: 'Shipment processed successfully' });

        console.log(invSys.getShipments());
    } catch (error) {
        console.error('Error on /sensor endpoint:', error);
        res.status(500).json({ error: (error as Error).message });
    }
});

app.listen(PORT, () => {
  console.log('Server running on port', {PORT}.PORT);
});

start();
