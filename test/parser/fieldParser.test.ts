import Field from "../../src/model/Field";
import { parseFields } from "../../src/parser/fieldParser";

describe('field parser', () => {
    it('should throw an error when invalid pattern is passed', () => {
        const fields: Field[] = [{ name: 'Minute', min: 0, max: 59, pattern: '80' }];

        expect(() => parseFields(fields)).toThrow('Invalid field Minute');
    });

    it('should throw an error when pattern is unknown', () => {
        const fields: Field[] = [{ name: 'Minute', min: 0, max: 59, pattern: '<uknown pattern>' }];

        expect(() => parseFields(fields)).toThrow('No parser available to parse field Minute');
    });

    it('should parse a number field', () => {
        const minField = { name: 'Minute', min: 0, max: 59, pattern: '15' };
        const fields: Field[] = [minField];

        const expected = [{ ...minField, sequence: [15] }];
        expect(parseFields(fields)).toEqual(expected);
    });

    it('should parse a wildcard field', () => {
        const weekDayField = { name: 'Week Day', min: 1, max: 7, pattern: '*' };
        const fields: Field[] = [weekDayField];

        const expected = [{ ...weekDayField, sequence: [1, 2, 3, 4, 5, 6, 7] }]
        expect(parseFields(fields)).toEqual(expected);
    });

    describe('when field is a list', () => {
        it('should parse a list of field values', () => {
            const listField = { name: 'Minute', min: 0, max: 59, pattern: '15,30,45' };
            const fields: Field[] = [listField];

            const expected = [{ ...listField, sequence: [15, 30, 45] }];
            expect(parseFields(fields)).toEqual(expected);
        });

        it('should throw an error when any field value is invalid in the list', () => {
            const fields: Field[] = [{ name: 'Minute', min: 0, max: 59, pattern: '15,30,45,60' }];

            expect(() => parseFields(fields)).toThrow('Invalid field Minute');
        });
    });

    describe('when field is a range', () => {

        it('should parse a range of field values', () => {
            const rangeField = { name: 'Minute', min: 0, max: 59, pattern: '15-20' };
            const fields: Field[] = [rangeField];

            const expected = [{ ...rangeField, sequence: [15, 16, 17, 18, 19, 20] }];
            expect(parseFields(fields)).toEqual(expected);
        });

        it('should throw an error when any field value is out of range', () => {
            const fields: Field[] = [{ name: 'Minute', min: 0, max: 59, pattern: '15-100' }];

            expect(() => parseFields(fields)).toThrow('Invalid field Minute');
        });
    });

    describe('when field is a step', () => {
        it('should parse step field values', () => {
            const stepField = { name: 'Minute', min: 0, max: 59, pattern: '*/15' };
            const fields: Field[] = [stepField];

            const expected = [{ ...stepField, sequence: [0, 15, 30, 45] }];
            expect(parseFields(fields)).toEqual(expected);
        });
    });

});