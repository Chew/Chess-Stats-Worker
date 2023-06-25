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

            if (game.winner == null) {
                draws++;
            } else if (game.winner == playerId) {
                wins++;
            } else {
                losses++;
            }
        }

        const winPct = (wins / (wins + losses + draws)) * 100;

        return {
            playerId, wins, losses, draws, winPct
        }
    }
}
