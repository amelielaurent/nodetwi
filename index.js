const Twitter = require("twitter");
const dotenv = require("dotenv");
const TwitterStream = require("./TwitterStream");
const {Transform}= require("stream");

dotenv.config();
const twitterClient = new Twitter ({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// const stream = twitterClient.stream("statuses/filter", {track: "javascript"});
// stream.on("data", tweet => {
//     console.log(tweet);
// });

const stream = new TwitterStream(twitterClient);
stream.track("javascript"); //On passe le mot clé
//stream.pipe(process.stdout);

const tweetExtractor = new Transform({
    readableObjetMode: true,
    writableObjectMode: true,

    transform (chunk, encoding, callback){
        const newChunk = chunk.text;
        this.push(newChunk);
        callback();
    }
})

const stringify = new Transform ({
    writableObjectMode: true,

    transform (chunk, encoding, callback){
        const newChunk = JSON.stringify(chunk);
        this.push(newChunk);
        callback();
    }
})

stream.pipe(tweetExtractor).pipe(stringify).pipe(process.stdout);