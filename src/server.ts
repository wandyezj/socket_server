import * as express from "express";

const app = express();

// port to listen on
const port = 3000;

// get request and response
app.get('/', (request, response) => response.send('Hello World!'));


// listen on the port
app.listen(port, () => 
console.log(`Example app listening on port ${port}!

Visit:

http://localhost:${port}
`));