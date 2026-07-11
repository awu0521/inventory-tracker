import { InvalidDateError } from "../domain/errors/InvalidDateError";

export function parseDate(date: string) {
    if (date.length !== 10) throw new InvalidDateError("Date is of the wrong number of elements.");

    const year = Number(date.substring(0, 4));
    const month = Number(date.substring(5, 7)) - 1;
    const day = Number(date.substring(8, 10));

    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
        throw new InvalidDateError("Added date cannot be converted into a valid date.");
    }

    return new Date(year, month, day);
}