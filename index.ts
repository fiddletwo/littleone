import "dotenv/config";
import { App } from "@slack/bolt";

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
});

app.command("/littleone-ping", async (args) => {
    const { ack, respond } = args;

    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `Latency: ${latency}` });
});

void (async () => {
    await app.start();
    console.log("Online");
})();
