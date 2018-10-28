const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");
const SocketStream = require("./SocketStream");
const TwitterStream = require("./TwitterStream");
const Twitter = require("twitter");

const dotenv = require("dotenv");
dotenv.config();

const twitterClient = new Twitter ({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


const {stringify, tweetExtractor, moderator} = require("./transform");

const server = http.createServer();
const wsServer = new WebSocket.Server({ server });
// const wss = new WebSocket.Server({ server: server });

server.on("request", (request, response) => { //Ecoute l'évenement request
    const fileSrc = fs.createReadStream("./public/index.html"); //Crée le stream
    fileSrc.pipe(response);
});

server.listen(8080);

wsServer.on("connection", ws => {
    console.log("connection", ws);
    // const message = {
    //     id: 12,
    //     content: "data from server"
    // };
    // const messageStr = JSON.stringify(message);
    // ws.send(messageStr);

    ws.on("message", message => {
        console.log("message from client: ", message);
        //stream.track(message);
    });

    const socketStr = new SocketStream(ws);
    process.stdin.pipe(socketStr);

    const stream = new TwitterStream(twitterClient);
    // if(mot) {
    //     console.log("value");
    //     stream.track(getValue(this.mot));
    // } else
    stream.track("macron");
    stream.pipe(tweetExtractor).pipe(moderator).pipe(stringify).pipe(socketStr);
});
