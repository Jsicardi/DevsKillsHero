const fs = require('fs');
const {Client} = require('pg');
const { exit } = require('process');

class ApiUtils{
    static async getDBConnection(){
        let credentials = JSON.parse(fs.readFileSync('credentials.json'));
        const client = new Client({
            user: credentials.user,
            password: credentials.password,
            host: credentials.host,
            port: parseInt(credentials.port),
            database: credentials.database
        });

        try{
            await client.connect();
            return client;
        }
        catch(e){
            console.error(`Failed to connect ${e}`)
            exit(-1)
        }

    }
}

module.exports = ApiUtils;