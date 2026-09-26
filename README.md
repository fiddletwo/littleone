# littleone
A Slack bot with various fun features

## Features
- Football standings lookup for the top 5 leagues in Europe
- Some other number related commands

## Commands
Commands should be prefixed with `/`
```
lo-help
lo-root [number]
lo-square [number]
lo-dice [count?]
lo-standings [epl | laliga | bundesliga | seriea | ligue1]
```

## Quick Start
To run this bot yourself, first clone this repository.

Then, create a file named `.env` and add:
```
SLACK_BOT_TOKEN=<your_token>
SLACK_APP_TOKEN=<your_token>
```  

In your Slack App, you must add the corresponding commands which can be found in `src/commands`  

Finally, run the bot with `pnpm run start`
