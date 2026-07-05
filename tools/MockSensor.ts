import { testContainer } from "../tests/fixtures/ItemContainers";
import { testItem1 } from "../tests/fixtures/Items";

const PORT: string = 'https://localhost:3000/sensor';

async function moveShipment(innerSensorTime: number, outerSensorTime: number) {
    try {
        const response = await fetch(PORT, {
            method: 'POST',
            body: JSON.stringify({
                innerSensor: innerSensorTime,
                outerSensor: outerSensorTime,
                name: 'testShipment',
                contents: [testItem1, testContainer],
                origin: 'testOrigin',
                dest: 'testDest',
                status: 'incoming',
                deadline: '00/00/00'
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        return response;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

async function main() {
    await moveShipment(10, 0); // incoming Shipment
    await moveShipment(0, 10); // outgoing Shipment
}

main();