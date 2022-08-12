const ApiUtils = require('./api_Utils');
const fs = require('fs');

//set json parser and csv headers
const { Parser } = require('json2csv');
const fields = ['superhero', 'publisher', 'alter_ego', 'first_appearance', 'id'];
const opts = { fields };

let pgClient;

init();

function init(){
    (async() => {
        await importToDB().then(async() =>{
            pgClient.end();
        })
    })();
}

//creates tables and imports heroes.json to DB
async function importToDB(){

    var createTablesQuery = fs.readFileSync('create_tables.sql').toString();

    pgClient = await ApiUtils.getDBConnection();

    console.log('Connected to PostgreSQL database');
    
    //creation of tables
    await pgClient.query(createTablesQuery)
    .catch((e) => {
        console.log(`Error on creating import tables: ${e}`);
        pgClient.end();
        process.exit(-1);
    });

    console.log('Tables created');
    
    //generate additional csv file from json file
    const parser = new Parser(opts);
    let import_data = JSON.parse(fs.readFileSync('heroes.json'), function(k,v){
        if(k == "id")
            return parseInt(v)
        return v  
    });
    const import_csv = parser.parse(import_data);

    let abs_path = JSON.parse(fs.readFileSync('credentials.json')).abs_path;
    fs.writeFileSync(`${abs_path}heroes.csv`,import_csv,function (err) {
        if (err) throw err;
    });

    //populate table with csv data
    await pgClient.query(`COPY heroes(superhero,publisher,alter_ego,first_appearance,id) FROM '${abs_path}heroes.csv' DELIMITER ',' CSV HEADER;`)
    .catch((e) => {
        console.log(`Error on creating import tables: ${e}`);
        pgClient.query(`DROP TABLE heroes`)
        pgClient.end();
        process.exit(-1);
    });

    //remove additional csv 
    fs.unlinkSync(`${abs_path}heroes.csv`)
    console.log('Successfully imported to PostgreSQL');
}