import { testContainer1 } from "./itemContainers";
import { testItem1, testItem2 } from "./items";

export const incomingShipment = {
        innerSensor: 10,
        outerSensor: 0,
        name: 'incomingShipment',
        contents: [testItem1],
        origin: 'here',
        dest: 'there',
        status: 'test',
        deadline: '2000-01-02'
    };

export const outgoingShipment = {
        innerSensor: 0,
        outerSensor: 10,
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
        innerSensor: 0,
        outerSensor: 10,
        name: 'populatedShipment',
        contents: [testContainer1, testItem1, testItem2],
        origin: 'here',
        dest: 'there',
        status: 'test',
        deadline: '2000-01-02'
    };