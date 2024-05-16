import Field from "../model/Field";

export function parseExpression(expr: string) {
    const tokens = expr.split(' ');
    if (tokens.length != 5) {
        throw new Error('Invalid cron expression');
    }

    return mapToFields(tokens);
}

function mapToFields(fields: string[]): Field[] {
    const fieldConfiguration: Field[] = [{
        name: 'Minute',
        min: 0,
        max: 59
    }, {
        name: 'Hour',
        min: 0,
        max: 23
    }, {
        name: 'Day',
        min: 1,
        max: 31
    },
    {
        name: 'Month',
        min: 1,
        max: 12
    }, {
        name: 'Week Day',
        min: 1,
        max: 7
    }];

    return fieldConfiguration.map((fieldConfig: Field, index: number) => {
        return {
            ...fieldConfig,
            pattern: fields[index]
        }
    });
}
