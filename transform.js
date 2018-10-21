const {Transform} = require("stream");

//Enlever tweetExtractor si on ne veut pas le texte
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

//Création d'un modérateur
const moderator = new Transform ({
    writableObjectMode: true,
    readableObjectMode: true,

    transform(chunk, encoding, callback){

        //Le test va permettre de savoir si au moins un de ces mots se trouvent dans le tweet
        // Ce test est sensible à la casse
        const conditions = ["emmerde","merde", "merdeux", "connard", "Putain", "ptn", "fdp", "salope", "putain", "magouilleurs", "abruti"];
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