import { ShipmentStatus } from "./domain/enums/ShipmentStatus";
import { AddShipmentEvent } from "./domain/events/AddShipmentEvent";
import { RemoveShipmentEvent } from "./domain/events/RemoveShipmentEvent";
import { InventorySystem } from "./domain/inventory/InventorySystem";
import { Shipment } from "./domain/models/Shipment";

const express = require('express');
const app = express();
const PORT = 3000;

let invSys: InventorySystem;

function start() {
    // TODO: add client logic to create inventory system rather
    // than inside of server.
    invSys = new InventorySystem('system', 'warehouse');
}

app.post('/sensor', () => {

    // TODO: pass data to an adapter that converts JSON to uniform format.
    // TODO: make uniform JSON data into a Shipment object.
    // TODO: compare sensor update times for incoming vs. outgoing.
    
    // TODO: extract incoming vs. outgoing logic elsewhere to avoid SRP violation.
    let incoming: boolean = false;
    let outgoing: boolean = false;

    // TODO: get shipment data from incoming JSON from arduino.
    if (incoming) invSys.handleEvent(new AddShipmentEvent(), new Shipment('temp',
        'origin', 'dest', ShipmentStatus.INCOMING, new Date()));

    // TODO: get shipment data from incoming JSON from arduino.
    //       here it should be a shipment that the warehouse contains,
    //       so we should update that specific shipment, not a new shipment object.
    if (outgoing) invSys.handleEvent(new RemoveShipmentEvent(), new Shipment('temp',
        'origin', 'dest', ShipmentStatus.INCOMING, new Date()));
});

app.listen(PORT, () => {
  console.log('Server running on port', {PORT}.PORT);
});

start();