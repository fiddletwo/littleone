import { join } from "path";

import { Command, loadCommands } from "../utils/commands";

let commands: Command[] = [];

loadCommands(join(import.meta.dirname))
    .then((cmds) => {
        commands = cmds;
    })
    .catch((err) => console.error(err));

const command: Command = {
    name: "help",
    run: async (respond) => {
        if (commands.length === 0) {
            await respond("Failed to load commands");
            return;
        }

        await respond(
            `Commands\n\n${commands.map((command) => `\`lo-${command.name}${command.usage ? ` ${command.usage}` : ""}\``).join("\n")}`,
        );
    },
};

export default command;
