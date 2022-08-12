const Joi = require('joi');

class VoteApi{

    static validateVote(vote){
        let schema = Joi.object({
            superhero : Joi.string().required(),
        });
        return schema.validate(vote);
    }
    
    static async getVotedHeroes(client){
        const results = await client.query(`SELECT * FROM heroes WHERE votes != 0 ORDER BY votes DESC`);
        return results.rows
    }

    static async getVotedPublishers(client){
        const results = await client.query(`SELECT publisher, sum(votes) as votes FROM heroes GROUP BY publisher ORDER BY votes DESC`);
        return results.rows
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

    static async getHeroByName(name,client){
        const results = await client.query(`SELECT * FROM heroes WHERE superhero=$1`,[name]);
        return results.rows
    }

}

module.exports = VoteApi;