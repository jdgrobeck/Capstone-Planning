const env = require("dotenv")
const axios = require("axios")

const getScores = (req, res) => {
    const apiKey = process.env.API_KEY
    const scores = 'https://api.the-odds-api.com/v4/sports/basketball_nba/scores/'; 
    console.log(apiKey)

        axios.get(scores + "?daysFrom=3&apiKey=" + apiKey)
        .then(response => {
            // response.data.data contains a list of live and 
            //   upcoming events and odds for different bookmakers.
            // Events are ordered by start time (live events are first)
            res.json(response.data)
            console.log(response.data)
            
        
            // Check your usage
            console.log('Remaining requests',response.headers['x-requests-remaining'])
            console.log('Used requests',response.headers['x-requests-used'])
        
        })
        .catch(error => {
            // console.log('Error status', error.response.status)
            // console.log(error.response.data)
            console.log(error)
            res.status(500).json({message: error.message})
        })


    }

    module.exports = {getScores}