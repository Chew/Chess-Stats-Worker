// export Error404 class
import {DEFAULT_LAYOUT} from "../layouts/default";
import {MiscUtil} from "../util";

export class Error404 extends Error {
    status: number;
    constructor(message?: string) {
        super(message || "Not Found");
        this.status = 404;
    }
}

export function buildError404(message?: string) {
    return DEFAULT_LAYOUT
        .replace("{{ meta }}", MiscUtil.buildMetaTags("Error 404", message || "Page Not Found"))
        .replace("{{ yield }}", `
    <h1>Error 404</h1>
    <p>${message || "Page Not Found"}</p>
    <p><a href="/" class="btn btn-primary">Home</a></p>
    `);
}
