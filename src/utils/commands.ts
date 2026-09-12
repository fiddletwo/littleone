import { readdir } from "fs/promises";
import { join } from "path";

import { RespondFn } from "@slack/bolt";

export type Command = {
    name: string;
    run: (respond: RespondFn, args: string[]) => Promise<void>;
};

export async function loadCommands(commandsDirectory: string): Promise<Command[]> {
    const paths = await readdir(commandsDirectory, { recursive: true });
    const commands: Command[] = [];
    for (const path of paths) {
        if (!path.endsWith(".ts")) continue;
        const { default: command } = await import(join(commandsDirectory, path));
        commands.push(command);
    }

    return commands;
}
