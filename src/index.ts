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

async function buildResponse(path: string, env: Env): Promise<string> {
	if (path === "/") {
		const players = await Player.all(env.DB);
		const games = await Game.all(env.DB);

		return buildHomePage(players, games);
	}
	return "";
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

		return new Response(await buildResponse(path, env), {
			headers: {
				"content-type": "text/html;charset=UTF-8",
			}
		});
	},
};
