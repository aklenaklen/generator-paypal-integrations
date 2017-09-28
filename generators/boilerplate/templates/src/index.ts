import * as glue from "glue";
import * as hapi from "hapi";
import { manifest } from "./manifest";

async function start() {
    try {
        const server = await glue.compose(manifest);
        const servers = await server.start();
        server.connections.forEach((connection: any) => server.log(["info", "connection"], connection.info));
    }  catch (err) {
        throw err;
    }
}

try {
    start();
} catch (err) {
    throw err;
}
