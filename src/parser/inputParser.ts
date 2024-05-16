export function parseInput() {
    const args = process.argv;
    const input = args[2];
    if (!input) {
        throw new Error('Invalid input');
    }
    const lastSpaceIndex = input.lastIndexOf(' ');
    const cronExpression = input.slice(0, lastSpaceIndex).trim();
    const command = input.slice(lastSpaceIndex + 1).trim();

    return [cronExpression, command];
}
