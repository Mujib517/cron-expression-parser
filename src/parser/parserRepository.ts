import Field from "../model/Field";

function numberParser(field: Field) {
    if (!isValid(field)) throw new Error(`Invalid field ${field.name}`);
    return [parseInt(field.pattern)];
}

function wildCardParser(field: Field) {
    const result = [];
    for (let i = field.min; i <= field.max; i++) {
        result.push(i);
    }
    return result;
}

function rangeParser(field: Field) {
    const values = field.pattern.split('-').map(val => parseInt(val));
    for (const val of values) {
        if (!isInRange(field, val)) throw new Error(`Invalid field ${field.name}`);
    }
    const [start, end] = values;
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

function listParser(field: Field) {
    const values = field.pattern.split(',').map(val => parseInt(val));
    for (const val of values) {
        if (!isInRange(field, val)) throw new Error(`Invalid field ${field.name}`);
    }
    return values;
}

function stepParser(field: Field) {
    const [_, stepToken] = field.pattern.split('/');
    const step = parseInt(stepToken);
    const { min, max } = field;
    const result = [];
    for (let i = min; i <= max; i = i + step) {
        result.push(i);
    }
    return result;
}

function isValid(field: Field) {
    const val = parseInt(field.pattern);
    if (isNaN(val)) return false;

    return isInRange(field, val);
}

function isInRange(field: Field, val: number) {
    const { min, max } = field;
    return val >= min && val <= max;
}


export const getAllParsers = (): Array<{ pattern: RegExp, parserFn: Function }> => {
    const parsers = [{
        pattern: /^\d+$/,
        parserFn: numberParser
    },
    {
        pattern: /^\*$/,
        parserFn: wildCardParser
    },
    {
        pattern: /,/,
        parserFn: listParser
    },
    {
        pattern: /-/,
        parserFn: rangeParser
    },
    {
        pattern: /^\*\/\d+$/,
        parserFn: stepParser
    }];

    return parsers;
};