import Field from "../model/Field";
import { parseExpression } from "./exprParser";
import { parseFields } from "./fieldParser";

export const parseCron = (cronStr) => {
    const fields: Field[] = parseExpression(cronStr);
    return parseFields(fields);
};