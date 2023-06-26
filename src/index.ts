/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import {buildHomePage} from "./pages/home";
import {Player} from "./models/player";
import {Game} from "./models/game";
import {buildPlayerPage} from "./pages/player";
import {DEFAULT_LAYOUT} from "./layouts/default";
import {buildError404, Error404} from "./pages/errors";

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	DB: D1Database;
}

async function buildResponse(path: string, env: Env): Promise<string | null> {
	if (path === "/") {
		const players = await Player.all(env.DB);
		const games = await Game.all(env.DB);

		return buildHomePage(players, games);
	} else if (path.startsWith("/player")) {
		const player = await Player.find_by(env.DB, "username", path.split("/")[2]);
		if (player == null) {
			throw new Error404("Player not found");
		}

		const games = await player.games(env.DB);

		// now we need to get players this player has played against
		const opponents = new Set<number>(); // we use a set because we don't want duplicates
		for (const game of games) {
			if (game.white === player.id) {
				opponents.add(game.black);
			} else {
				opponents.add(game.white);
			}
		}

		console.debug("opponents", opponents);

		// now we need to get the players from the set
		const oppCommas = Array.from(opponents).join(',');
		const oppRes = await env.DB.prepare(`SELECT * FROM players WHERE id IN (${oppCommas})`).all();
		const opps = (oppRes.results as Player[]).map((pla) => new Player(pla.id, pla.username));

		console.debug("opps", opps);

		return buildPlayerPage(player, opps, games);
	}
	throw new Error404("Page not found");
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const url = new URL(request.url);

		// get path
		const path = url.pathname;

		try {
			const response = await buildResponse(path, env);

			return new Response(await buildResponse(path, env), {
				headers: {
					"content-type": "text/html;charset=UTF-8",
				}
			});
		// catch 404s
		} catch (e) {
			if (e instanceof Error404) {
				return new Response(buildError404(e.message), {
					headers: {
						"content-type": "text/html;charset=UTF-8",
					},
					status: 404,
				});
			} else {
				throw e;
			}
		}
	},
};
