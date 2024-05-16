import { parseCron } from "./parser/cronParser";
import { parseInput } from "./parser/inputParser";
import { writeToConsole } from "./writer/consoleWriter";

/* 
execution flow:
    index.ts
        - inputParser
        - cronParser
           - exprParser
                - fieldParser
        - writer
*/
(function () {
    const [cronExpression, command] = parseInput();
    const parsedFields = parseCron(cronExpression);
    writeToConsole(parsedFields, command);
})();