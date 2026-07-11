import { expect } from "chai";
import { parseDate } from "../../src/parsers/dateParser";

describe('dateParser', () => {
    let dateString1 = "0001/02/01";
    let dateString2 = "0001-02-01";
    let dateString3 = "2000-05-04";
    let invalidDateString1 = "1-00-00";
    let invalidDateString2 = "01-1-00";
    let invalidDateString3 = "01-01-1";
    let invalidDateString4 = "!@#$%^&*";
    let testDate: Date;

    beforeEach(() => {
        testDate = new Date(1, 1, 1);
    });

    it('should parse correct dates with proper spacing', () => {
        testDate = parseDate(dateString1);
        const date: Date = new Date(1901, 1, 1);
        expect(compareDate(testDate, date)).to.eq(true);

        testDate = parseDate(dateString2);
        expect(compareDate(testDate, date)).to.eq(true);
    });

    it('should parse dates with valid numbers', () => {
        testDate = parseDate(dateString3);
        const date: Date = new Date(2000, 4, 4);
        expect(compareDate(testDate, date)).to.eq(true);
    });

    it('should not parse dates with invalid years', () => {
        try {
            testDate = parseDate(invalidDateString1);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(compareDate(testDate, new Date(1, 1, 1))).to.eq(true);
        }
    });

    it('should not parse dates with invalid months', () => {
        try {
            testDate = parseDate(invalidDateString2);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(compareDate(testDate, new Date(1, 1, 1))).to.eq(true);
        }
    });

    it('should not parse dates with invalid months', () => {
        try {
            testDate = parseDate(invalidDateString3);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(compareDate(testDate, new Date(1, 1, 1))).to.eq(true);
        }
    });

    it('should not parse dates with non number entries', () => {
        try {
            testDate = parseDate(invalidDateString4);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(compareDate(testDate, new Date(1, 1, 1))).to.eq(true);
        }
    });

    function compareDate(date1: Date, date2: Date) {
        if (testDate.getFullYear() !== date2.getFullYear()) return false;
        else if (testDate.getMonth() !== date2.getMonth()) return false;
        else if (testDate.getDate() !== date2.getDate()) return false;
        return true;
    }

});