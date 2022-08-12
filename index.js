const express = require('express');
const app = express();

app.use(express.json());

const VoteApi = require("./vote")
const ApiUtils = require("./api_Utils")
const version = "v1"
let pgClient;

startDbConnection();

//connects with DB
async function startDbConnection(){
    pgClient = await ApiUtils.getDBConnection();
}

//POST a vote for a superhero
app.post(`/api/${version}/votes`, async (req,res) => {
    res.setHeader("content-type", "application/json")
    const reqJson = req.body

    const {error} = VoteApi.validateVote(req.body);

    if(error){
        //400 Bad Request
        return res.status(400).send("");
    }

    const rows = await VoteApi.voteHero(req.body.superhero,pgClient)
    res.send(rows[0])
});

//GET all heroes with votes
app.get(`/api/${version}/votes/heroes`,async(req,res)=>{
    res.setHeader("content-type", "application/json");

    const heroesRows = await VoteApi.getVotedHeroes(pgClient)

    res.send(heroesRows);

});

//GET all publishers with votes
app.get(`/api/${version}/votes/publisher`,async(req,res)=>{
    res.setHeader("content-type", "application/json");

    const publisherRows = await VoteApi.getVotedPublishers(pgClient)

    res.send(publisherRows);

});

//PORT
const port = process.env.PORT || 3000 ;
app.listen(port, ()=>console.log(`Listening to port ${port} . . .`));