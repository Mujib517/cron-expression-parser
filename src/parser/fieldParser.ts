import Field from "../model/Field";
import { getAllParsers } from "./parserRepository";

function parseField(field: Field): Field {
    const parsers = getAllParsers();
    for (const parser of parsers) {
        if (parser.pattern.test(field.pattern)) {
            return {
                ...field,
                sequence: parser.parserFn(field)
            }
        }
    }

    throw new Error(`No parser available to parse field ${field.name}`);
}

export function parseFields(fields: Field[]) {
    return fields.map(parseField);
}


