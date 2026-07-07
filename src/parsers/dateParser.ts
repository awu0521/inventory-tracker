export function parseDate(date: string) {
    const year = Number(date.substring(0, 1));
    const month = Number(date.substring(3, 4));
    const day = Number(date.substring(6, 7));

    let deadline: Date = new Date();

    deadline.setFullYear(year);
    deadline.setMonth(month);
    deadline.setDate(day);

    return deadline;
}