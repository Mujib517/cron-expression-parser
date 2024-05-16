import { processCron } from "../../src/parser/cronParser";

describe('index', () => {
    const input = [
        // 1st Feb Wednesday 12:30
        {
            expr: '30 12 1 2 3',
            expected: [
                { name: 'Minute', values: [30] },
                { name: 'Hour', values: [12] },
                { name: 'Day', values: [1] },
                { name: 'Month', values: [2] },
                { name: 'Week Day', values: [3] }
            ]
        },

        // 1st of Feb 12:30
        {
            expr: '30 12 1 2 *',
            expected: [
                { name: 'Minute', values: [30] },
                { name: 'Hour', values: [12] },
                { name: 'Day', values: [1] },
                { name: 'Month', values: [2] },
                { name: 'Week Day', values: [1, 2, 3, 4, 5, 6, 7] }
            ]
        },

        // 1st of every month at 12:30
        {
            expr: '30 12 1 * *',
            expected: [
                { name: 'Minute', values: [30] },
                { name: 'Hour', values: [12] },
                { name: 'Day', values: [1] },
                { name: 'Month', values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
                { name: 'Week Day', values: [1, 2, 3, 4, 5, 6, 7] }
            ]
        },

        // 1 and 15 day of every month run at 12am every 15mns
        {
            expr: '*/15 0 1,15 * *',
            expected: [
                { name: 'Minute', values: [0, 15, 30, 45] },
                { name: 'Hour', values: [0] },
                { name: 'Day', values: [1, 15] },
                { name: 'Month', values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
                { name: 'Week Day', values: [1, 2, 3, 4, 5, 6, 7] }
            ]
        },

        // every two months on first day of the month at mid night
        {
            expr: '0 0 1 */2 *',
            expected: [
                { name: 'Minute', values: [0] },
                { name: 'Hour', values: [0] },
                { name: 'Day', values: [1] },
                { name: 'Month', values: [1, 3, 5, 7, 9, 11] },
                { name: 'Week Day', values: [1, 2, 3, 4, 5, 6, 7] }
            ]
        },

        // Mon- Fri every month from 9AM to 5PM
        {
            expr: '0 9-17 * * 1-5',
            expected: [
                { name: 'Minute', values: [0] },
                { name: 'Hour', values: [9, 10, 11, 12, 13, 14, 15, 16, 17] },
                { name: 'Day', values: fillArray(31) },
                { name: 'Month', values: fillArray(12) },
                { name: 'Week Day', values: fillArray(5) }
            ]
        },

        // 1st of every month Mon-Fri at mid night
        {
            expr: '0 0 1 * 1-5',
            expected: [
                { name: 'Minute', values: [0] },
                { name: 'Hour', values: [0] },
                { name: 'Day', values: [1] },
                { name: 'Month', values: fillArray(12) },
                { name: 'Week Day', values: fillArray(5) }
            ]
        },

        // 1st and 15th of every month Mon-Fri start mid night and run every 15mns
        {
            expr: '*/15 0 1,15 * 1-5',
            expected: [
                { name: 'Minute', values: [0, 15, 30, 45] },
                { name: 'Hour', values: [0] },
                { name: 'Day', values: [1, 15] },
                { name: 'Month', values: fillArray(12) },
                { name: 'Week Day', values: fillArray(5) }
            ]
        }
    ];

    const invalidInput = ['* * *', '1 2 * 3 * 4 *'];

    it.each(input)('should parse cron expressions correctly', (testInput) => {
        console.log('input', testInput.expr);
        const result = processCron(testInput.expr);
        const transformedResult = result.map(item => {
            return {
                name: item.name,
                values: item.values
            };
        });

        expect(transformedResult).toEqual(testInput.expected);
    });

    it.each(invalidInput)('should throw an error if the cron expression is invalid', (inputExpr) => {
        expect(() => processCron(inputExpr)).toThrow('Invalid cron');
    });
});


function fillArray(n) {
    return Array.from({ length: n }, (_, index) => index + 1)
}