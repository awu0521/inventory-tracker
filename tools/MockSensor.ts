import { testContainer1 } from "../tests/fixtures/itemContainers";
import { testItem1 } from "../tests/fixtures/items";

const PORT: string = 'http://localhost:3000/sensor';

async function moveShipment() {
    try {
        const response = await fetch(PORT, {
            method: 'POST',
            body: JSON.stringify({
                name: 'testShipment',
                contents: [testItem1, testContainer1],
                origin: 'testOrigin',
                dest: 'testDest',
                status: 'incoming',
                deadline: '0000/00/00'
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
            console.log('error cause: ', (error as any).cause);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

async function main() {
    await moveShipment(); // incoming Shipment
    await moveShipment(); // outgoing Shipment
}

main();