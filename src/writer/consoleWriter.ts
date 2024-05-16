import Field from "../model/Field";

export const writeToConsole = (fields: Field[], command: string) => {
    console.log('Command: ', command);
    console.table(fields, ['name', 'values']);
};

