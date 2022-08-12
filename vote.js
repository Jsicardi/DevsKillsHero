const Joi = require('joi');

class VoteApi{

    static validateVote(vote){
        let schema = Joi.object({
            superhero : Joi.string().required(),
        });
        return schema.validate(vote);
    }
    
    static async getVotedHeroes(client){
        try{
            const results = await client.query(`SELECT * FROM heroes WHERE votes != 0 ORDER BY votes DESC`);
            return results.rows
        }
        catch(e){
            console.log(e);
        }
    }

    static async getVotedPublishers(client){
        try{
            const results = await client.query(`SELECT publisher, sum(votes) as votes FROM heroes GROUP BY publisher ORDER BY votes DESC`);
            return results.rows
        }
        catch(e){
            console.log(e);
        }
    }

    static async voteHero(name,client){
        try{
            await client.query(`UPDATE heroes SET votes=votes+1 WHERE superhero=$1`, [name]);
            const results = await client.query(`SELECT id,superhero,publisher,votes FROM heroes WHERE superhero=$1`,[name]);
            return results.rows
            
        }
        catch(e){
            throw e;
        }

    }

}

module.exports = VoteApi;