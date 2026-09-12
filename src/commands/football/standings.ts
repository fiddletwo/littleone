import axios from "axios";

import { Command } from "../../utils/commands";

type Stat = {
    name: string;
    value: string;
};

const leagueMap: Record<string, string> = {
    epl: "eng.1",
    laliga: "esp.1",
    bundesliga: "ger.1",
    seriea: "ita.1",
    ligue1: "fra.1",
};
const leagueOptions: string[] = [];
for (const name in leagueMap) {
    leagueOptions.push(name);
}

const formattedLeagueOptions = leagueOptions.map((l) => `\`${l}\``);

const currentSeason = 2026;
const maxNameLength = 30;

const command: Command = {
    name: "standings",
    run: async (respond, args) => {
        const leagueInput = args[0]?.toLowerCase();

        if (leagueInput === undefined) {
            await respond(`No league was given\nAvailable options: ${formattedLeagueOptions.join(", ")}`);
            return;
        }
        if (!leagueOptions.includes(leagueInput)) {
            await respond(`Invalid league\nAvailable options: ${formattedLeagueOptions.join(", ")}`);
            return;
        }

        try {
            const standings: string[] = [];
            const {
                data: { data: league },
            } = await axios.get(
                `https://football-standings-api.vercel.app/leagues/${leagueMap[leagueInput]}/standings?season=${currentSeason}&sort=asc`,
            );

            let i = 1;
            for (const data of league.standings) {
                const { team, stats } = data;
                const pointsStat = stats.find((s: Stat) => s.name === "points");
                standings.push(
                    `${i < 10 ? ` ${i}` : i} | ${team.name.length > maxNameLength ? team.name.slice(0, maxNameLength - 3) + "..." : team.name}${" ".repeat(maxNameLength - team.name.length)}${pointsStat.value}`,
                );
                i++;
            }

            await respond(
                `${league.abbreviation}\n\n\`\`\` #${" ".repeat(maxNameLength + 3)}PTS\n${standings.join("\n")}\`\`\``,
            );
        } catch (err) {
            console.error(err);
            await respond("Failed to fetch league standings");
        }
    },
};

export default command;
