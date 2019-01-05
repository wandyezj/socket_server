import * as express from "express";
import * as WebSocket from "ws";


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
        // ping back
        // send the sent data back through the same connection
        ws.send("Server Says: " + data);
    });
}


function log(message: string) {
    console.log(message);
}
