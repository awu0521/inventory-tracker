import { ShipmentStatus } from "./domain/enums/ShipmentStatus";
import { AddShipmentEvent } from "./domain/events/AddShipmentEvent";
import { RemoveShipmentEvent } from "./domain/events/RemoveShipmentEvent";
import { InventorySystem } from "./domain/inventory/InventorySystem";
import { Shipment } from "./domain/models/Shipment";
import type { Request, Response } from "express";
import { parse } from "./parsers/shipmentParser";

const express = require('express');
const app = express();
const PORT = 3000;

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
    // TODO: pass data to an adapter that converts JSON to uniform format.
    // TODO: add checks for unpopulated shipment objects
    // TODO: allow user/importer to instantiate shipments and item components.
    let incoming: boolean = false;
    const body: JSON = req.body; // TODO: check if req is actually sending JSON
    
    const shipment: Shipment = parse(body);

    if (incoming) invSys.handleEvent(new AddShipmentEvent(), shipment);

    // here it should be a shipment that the warehouse contains,
    // so we should update that specific shipment, not a new shipment object.
    if (!incoming) invSys.handleEvent(new RemoveShipmentEvent(), shipment);
});

app.listen(PORT, () => {
  console.log('Server running on port', {PORT}.PORT);
});

start();