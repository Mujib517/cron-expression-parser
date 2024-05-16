import Field from "../../src/model/Field";
import { parseExpression } from "../../src/parser/exprParser";

describe('expression parser', () => {
    it('should thrown an error when cron expression is invalid', () => {
        const invalidCronExpr = "* * *";
        expect(() => parseExpression(invalidCronExpr)).toThrow('Invalid cron expression');
    });

    it('should parse the expression and return fields', () => {
        const cronExpr = "0 2 * * *";

        const actual = parseExpression(cronExpr);

        const expected: Field[] = [{
            name: 'Minute',
            min: 0,
            max: 59,
            pattern: "0"
        }, {
            name: 'Hour',
            min: 0,
            max: 23,
            pattern: "2"
        }, {
            name: 'Day',
            min: 1,
            max: 31,
            pattern: "*"
        },
        {
            name: 'Month',
            min: 1,
            max: 12,
            pattern: "*"
        }, {
            name: 'Week Day',
            min: 1,
            max: 7,
            pattern: "*"
        }];

        expect(actual).toEqual(expected);
    });
});