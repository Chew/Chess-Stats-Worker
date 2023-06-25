import {DEFAULT_LAYOUT} from "../layouts/default";
import {IPlayer, Player} from "../models/player";
import {Game} from "../models/game";
import {MiscUtil, Stat} from "../util";

export function buildHomePage(players: Player[], records: Game[]): string {
    // map of player id to stats
    let playerStats: Stat[] = [];
    for (const player of players) {
        playerStats.push(MiscUtil.buildRecord(player.id, records));
    }

    // sort playerStats by win percentage, then wins. e.g. if 2 people have same win percentage, the one with more wins is higher
    playerStats = playerStats.sort((a, b) => {
        if (a.winPct != b.winPct) {
            return b.winPct - a.winPct;
        }
        return b.wins - a.wins;
    });

    return DEFAULT_LAYOUT.replace("{{ yield }}", `
    <h1>Home</h1>
    <p>This is the home page.</p>
    
    <h2>Player List</h2>
    <p>List of players.</p>
    <table class="table table-striped table-bordered table-hover">
        <thead class="table-dark">
            <tr>
                <th>Username</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Draws</th>
                <th>Percent</th>
            </tr>
        </thead>
        <tbody>
            ${playerStats.map(playerStat => {
                const player = players.find(p => p.id == playerStat.playerId) || {} as IPlayer;
                return `
                <tr>
                    <td><a href="/player/${player.username}">${player.username}</a></td>
                    <td>${playerStat.wins}</td>
                    <td>${playerStat.losses}</td>
                    <td>${playerStat.draws}</td>
                    <td>${playerStat.winPct.toFixed(2)}%</td>
                </tr>
                `;
            }).join('')}
        </tbody>
    </table>
    `);
}
