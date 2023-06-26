import {Game} from "./game";

export interface IPlayer {
    id: number;
    username: string;
}

export class Player implements IPlayer {
    id: number;
    username: string;

    constructor(id: number, username: string) {
        this.id = id;
        this.username = username;
    }

    static async all(db: D1Database): Promise<Player[]> {
        const res = await db.prepare("SELECT * FROM players").all();
        const results = res.results as Player[];
        return results.map((pla) => new Player(pla.id, pla.username));
    }

    static async find(db: D1Database, id: number): Promise<Player | null> {
        const res = db.prepare("SELECT * FROM players WHERE id = ?").bind(id);
        const pla = await res.first() as Player;
        if (pla == null) return null;
        return new Player(pla.id, pla.username);
    }

    static async find_by(db: D1Database, col_name: string, col_value: string): Promise<Player | null> {
        const res = db.prepare(`SELECT * FROM players WHERE ${col_name} = ?`).bind(col_value);
        const pla = await res.first() as Player;
        if (pla == null) return null;
        return new Player(pla.id, pla.username);
    }

    async games(db: D1Database): Promise<Game[]> {
        const res = await db.prepare("SELECT * FROM games WHERE white = ? OR black = ?").bind(this.id, this.id).all();
        const results = res.results as Game[];
        return results.map((game) => new Game(game.id, game.date, game.white, game.black, game.winner, game.link));
    }
}
