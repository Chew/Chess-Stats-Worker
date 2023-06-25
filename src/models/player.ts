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
        return res.results as Player[];
    }

    static async find(db: D1Database, id: number): Promise<Player> {
        const res = db.prepare("SELECT * FROM players WHERE id = ?").bind(id);
        return await res.first() as Player;
    }

    static async find_by(db: D1Database, col_name: string, col_value: string): Promise<Player> {
        const res = db.prepare(`SELECT * FROM players WHERE ${col_name} = ?`).bind(col_value);
        return await res.first() as Player;
    }
}
