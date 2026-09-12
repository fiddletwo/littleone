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
    const commands = await loadCommands(commandsDirectory);
    for (const command of commands) {
        const { name, run } = command;
        app.command(`/littleone-${name}`, async ({ ack, respond }) => {
            await ack();
            await run(respond);
        });
    }

    console.log(`Loaded commands: ${commands.length}`);

    await app.start();
    console.log("Online");
})();
