import { Command } from "../../utils/commands";

const command: Command = {
    name: "dice",
    run: async (respond) => {
        const random = Math.floor(Math.random() * 5 + 1);
        await respond(`You rolled a ${random}!`);
    },
};

export default command;
