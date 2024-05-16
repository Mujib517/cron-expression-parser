import Field from "./model/Field";
import { processCron } from "./parser/cronParser";
import { writeToConsole } from "./writer/consoleWriter";

(function () {
    const args = process.argv;
    const input = args[2];
    if (!input) {
        throw new Error('Invalid input');
    }
    const lastSpaceIndex = input.lastIndexOf(' ');
    const cronExpression = input.slice(0, lastSpaceIndex).trim();
    const command = input.slice(lastSpaceIndex + 1).trim();

    const parsedFields = processCron(cronExpression);
    writeToConsole(parsedFields, command);
})();