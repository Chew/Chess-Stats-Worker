export interface IGame {
    id: number;
    date: string,
    white: number,
    black: number,
    winner: number,
    link: string
}

export class Game implements IGame {
    black: number;
    date: string;
    id: number;
    link: string;
    white: number;
    winner: number;

    constructor(id: number, date: string, white: number, black: number, winner: number, link: string) {
        this.id = id;
        this.date = date;
        this.white = white;
        this.black = black;
        this.winner = winner;
        this.link = link;
    }

    static async all(db: D1Database): Promise<Game[]> {
        const res = await db.prepare("SELECT * FROM games").all();
        return res.results as Game[];
    }

}
