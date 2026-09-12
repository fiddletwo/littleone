import { Command } from "../../utils/commands";

const command: Command = {
    name: "dice",
    run: async (respond, args) => {
        const count = args[0] ? parseInt(args[0]) : 1;

        const diceRolls: number[] = [];
        for (let i = 0; i < count; i++) {
            const random = Math.floor(Math.random() * 5 + 1);
            diceRolls.push(random);
        }

        await respond(`You rolled ${diceRolls.join(", ")}!`);
    },
};

export default command;
