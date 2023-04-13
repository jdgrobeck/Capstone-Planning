const env = require("dotenv")
const axios = require("axios")


const getGames = (req, res) => {
    const apiKey = process.env.API_KEY
    const basketball = 'https://api.the-odds-api.com/v4/sports/basketball_nba/odds'; 

        axios.get(basketball + "?apiKey=" + apiKey + "&regions=us&oddsFormat=american&markets=spreads")
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

module.exports = {getGames}


