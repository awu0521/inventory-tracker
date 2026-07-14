import { testContainer1 } from "./itemContainers";
import { testItem1, testItem2 } from "./items";

export const incomingShipment = {
        name: 'incomingShipment',
        contents: [testItem1],
        origin: 'here',
        dest: 'there',
        status: 'test',
        deadline: '2000-01-02'
    };

export const outgoingShipment = {
        name: 'outgoingShipment',
        contents: [testItem1],
        origin: 'here',
        dest: 'there',
        status: 'test',
        deadline: '2000-01-02'
    };

export const invalidShipment = {
        valid: false
    };

export const populatedShipment = {
        name: 'populatedShipment',
        contents: [testContainer1, testItem1, testItem2],
        origin: 'here',
        dest: 'there',
        status: 'test',
        deadline: '2000-01-02'
    };