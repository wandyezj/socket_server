import * as express from "express";
import * as WebSocket from "ws";

import {Message} from "message";
import { isUndefined } from "util";


const app = express();

// port to listen on
const port = 3000;

const socket_port = 5000;

// get request and response
app.get('/', (request, response) => response.send('Hello World!'));


// listen on the port
app.listen(port, () => 
console.log(`Example app listening on port ${port}!

Visit:

http://localhost:${port}
`));



// Socket

const ws = new WebSocket.Server({
    port: socket_port,
    host: "0.0.0.0"
});

ws.on("connection", connect);

function connect(ws: WebSocket) {
    log("connection");

    ws.on("message", (data: string) => {

        handleMessage(ws, data);
    });
}

type Command =  (ws: WebSocket, data: string) => void;

const registeredCommands: {[name: string]: Command} = {
    "unknown": commandUnknown,
    "ping": commandPing
}


function handleMessage(ws: WebSocket, data: string) {

    let message: Message = {};

    try {
        message = JSON.parse(data) as Message;
    } catch {
    }

    let commandName: string = message.command;
    const commandData: string = message.data;

    // Unknown Command
    if (isUndefined(commandName) || !registeredCommands.hasOwnProperty(commandName)) {
        commandName = "unknown";
    }

    const command: Command = registeredCommands[commandName];
    command(ws, commandData);
}

function commandUnknown(ws: WebSocket, data: string) {
    const message = "Unknown Command";
    ws.send("Server Says: " + message);
}

function commandPing(ws: WebSocket, data: string) {
    const message = data;
    // ping back
    // send the sent data back through the same connection
    ws.send("Server Says: " + message);
}

function log(message: string) {
    console.log(message);
}
