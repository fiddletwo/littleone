import { Command } from "../../utils/commands";

const command: Command = {
    name: "square",
    run: async (respond, args) => {
        if (args.length === 0) {
            await respond("No number was provided");
            return;
        }

        const num = parseFloat(args[0]);

        if (isNaN(num)) {
            await respond("Provided response was not a number");
            return;
        }

        await respond(`${num} squared is ${num * num}`);
    },
};

export default command;
