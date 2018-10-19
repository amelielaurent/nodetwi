const {Transform} = require("stream");

//Enlever tweetExtractor si on veut pas le texte
const tweetExtractor = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform (chunk, encoding, callback){
        const newChunk = chunk.text;
        this.push(newChunk);
        callback();
    }
});

const stringify = new Transform ({
    writableObjectMode: true,

    transform (chunk, encoding, callback){
        const newChunk = JSON.stringify(chunk) + "\n";
        this.push(newChunk);
        callback();
    }
});

const moderator = new Transform ({
    writableObjectMode: true,
    readableObjectMode: true,

    transform(chunk, encoding, callback){
        // test cases
        const conditions = ["merde", "connard", "ptn", "fdp", "pute", "salope", "putain", "con"];
        const test = conditions.some(el => chunk.includes(el));
        //const newChunk = chunk +' ===> '+ test;
        // this.push(newChunk);
        this.push({
            tweet: chunk,
            test
        });
        callback();
    }
});

module.exports = {
    tweetExtractor,
    stringify,
    moderator
}