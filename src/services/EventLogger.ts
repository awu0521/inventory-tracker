// logs system updates and inventory changes.

import { EventType } from "../domain/enums/EventType";

// TODO: consider logging to database with SQL.
export class EventLogger {
    private dateTime = new Date();

    log(type: EventType) {
        console.log("INFO | ");
        process.stdout.write(`${this.dateTime.getDate()}/${this.dateTime.getMonth()}/${this.dateTime.getFullYear()} `);
        process.stdout.write(`${this.dateTime.getHours()}:${this.dateTime.getMinutes()}:${this.dateTime.getSeconds()} | `);
        process.stdout.write(` INFO: ${EventType[type]} |`);

    }
}