import {Game} from "./models/game";

export interface Stat {
    playerId: number;
    wins: number;
    losses: number;
    draws: number;
    winPct: number;
}

export class MiscUtil {
    static buildRecord(playerId: number, games: Game[]): Stat {
        let wins = 0;
        let losses = 0;
        let draws = 0;

        for (const game of games) {
            if (game.white != playerId && game.black != playerId) continue;

            if (game.winner == playerId) {
                wins++;
            } else if (Number.isInteger(game.winner)) {
                losses++;
            } else {
                draws++;
            }
        }

        const winPct = (wins / (wins + losses + draws)) * 100;

        return {
            playerId, wins, losses, draws, winPct
        }
    }

    /**
     * Adds necessary tags for meta where needed
     * @param title The title of the page. Appears in navbar and embed titles. Do not include "- Service"
     * @param description Embed description
     */
    static buildMetaTags(title: string, description: string) {
        return `
                <title>${title}</title>
                <meta property="og:title" content="${title}">
                <meta property="twitter:title" content="${title}">
                <meta property="description" content="${description}">
                <meta name="description" content="${description}">
                <meta property="og:description" content="${description}">
                <meta property="og:site_name" content="Rangers Republic Chess Stats">
                <meta name="theme-color" content="#F078DD">
                <meta name="keywords" content="chew">
        `;
    }
}
