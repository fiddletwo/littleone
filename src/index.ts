import "dotenv/config";
import { join } from "path";

import { App } from "@slack/bolt";

import { loadCommands } from "./utils/commands";

const commandsDirectory = join(import.meta.dirname, "commands");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
});

void (async () => {
    try {
        const commands = await loadCommands(commandsDirectory);
        for (const command of commands) {
            const { name, run } = command;
            app.command(`/lo-${name}`, async ({ command, ack, respond }) => {
                await ack();

                const args = command.text;
                await run(respond, args === "" ? [] : args.split(" "));
            });
        }

        console.log(`Loaded commands: ${commands.length}`);

        await app.start();
        console.log("Online");
    } catch (err) {
        console.error(err);
    }
})();
