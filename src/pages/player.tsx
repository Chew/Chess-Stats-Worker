import {IPlayer, Player} from "../models/player";
import {Game} from "../models/game";
import {DEFAULT_LAYOUT} from "../layouts/default";
import {MiscUtil} from "../util";

export function buildPlayerPage(player: Player, players: Player[], records: Game[]): string {
    const stats = MiscUtil.buildRecord(player.id, records);
    const perPlayerStats = players.map(p => MiscUtil.buildRecord(p.id, records))
        // sort by total games (wins+losses+draws), then win percentage
        .sort((a, b) => {
            if ((a.wins + a.losses + a.draws) != (b.wins + b.losses + b.draws)) {
                return (b.wins + b.losses + b.draws) - (a.wins + a.losses + a.draws);
            }
            return b.winPct - a.winPct;
        })
        // filter self
        .filter(p => p.playerId != player.id);

    return DEFAULT_LAYOUT.replace("{{ yield }}", `
    <h1>Player Page for ${player.username}</h1>
    <p>This is their stats page. All stats are wins - losses - draws.</p>
    
    <p><a href="/" class="btn btn-primary">Home</a></p>
    
    <h2>Records</h2>
    <p>Overall: ${stats.wins} - ${stats.losses} - ${stats.draws}</p>

    <h2>Per-Player Breakdown</h2>
    <table class="table table-striped table-bordered table-hover">
        <thead class="table-dark">
            <tr>
                <th>Player</th>
                <th>Record</th>
            </tr>
        </thead>
        <tbody>
            ${perPlayerStats.map(stat => {
                const player = players.find(p => p.id == stat.playerId) || {} as IPlayer;
                // reverse order cus it's OUR record against THEM
                return `
                <tr>
                    <td><a href="/player/${player.username}">${player.username}</a></td>
                    <td>${stat.losses} - ${stat.wins} - ${stat.draws}</td>
                </tr>
                `;
            }).join('')}
        </tbody>
    </table>

    <h2>Game List</h2>
    <p>List of games, are they good?</p>
    <table class="dr table table-striped table-bordered table-hover">
        <thead class="table-dark">
            <tr>
                <th>Date</th>
                <th>White</th>
                <th>Black</th>
                <th>Result</th>
            </tr>
        </thead>
        <tbody>
            ${records.map(game => {
                const isPlayerWhite = game.white == player.id;

                const opponent = isPlayerWhite ? players.find(p => p.id == game.black) : players.find(p => p.id == game.white);

                const white = isPlayerWhite ? player.username : opponent?.username;
                const black = isPlayerWhite ? opponent?.username : player.username;

                // row class, red if loss, green if win, grey if draw
                let rowClass: string;
                let result: string;
                if (game.winner == null) {
                    rowClass = "table-secondary";
                    result = "Draw";
                } else if (game.winner == player.id) {
                    rowClass = "table-success";
                    result = "Win";
                } else {
                    rowClass = "table-danger";
                    result = "Loss";
                }

                return `
                <tr class="dr ${rowClass}">
                    <td><a href="${game.link}" target="_blank">${game.date}</a></td>
                    <td><a href="/player/${white}">${white}</a></td>
                    <td><a href="/player/${black}">${black}</a></td>
                    <td>${result}</td>
                </tr>
                `;
            }).join('')}
        </tbody>
    </table>
    `);
}
