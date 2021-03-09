const { MongoClient } = require("mongodb");

let dbClient;

const connectToDB = async () => {
    try {
        let string = "mongodb://localhost:27017";

        if (!dbClient) {
            dbClient = await MongoClient.connect(string, { useNewUrlParser: true, useUnifiedTopology: true });
        }
        if (dbClient) {
            console.log('database is connected successfully');
            return dbClient;
        } else {
            console.log('Error occured while connecting with db!!!');
        }

    } catch (err) {
        console.log("Error occured while connecting with db!!!", err)
    }
}


module.exports = connectToDB;