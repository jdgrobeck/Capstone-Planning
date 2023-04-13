const sports = 'https://api.the-odds-api.com/v4/sports'
const apiKey = '58d801718116db2c8282a6568a9ebcaa'
// const basketball odds = https://api.the-odds-api.com/v4/sports/basketball_nba/odds?apiKey=58d801718116db2c8282a6568a9ebcaa&regions=us&oddsFormat=american


const getAllSports = axios({
    method: 'get',
    url: sports + "?apiKey= " + apiKey,
  })
    .then(function (response) {
      console.log(response)
    });


   // /v4/sports/{sport}/odds/?apiKey={apiKey}&regions={regions}&markets={markets}

//    {
//     "key": "basketball_nba",
//     "group": "Basketball",
//     "title": "NBA",
//     "description": "US Basketball",
//     "active": true,
//     "has_outrights": false
// }

// Region is us. Make separate requests for h2h (ML), spreads and totals, oddsFormat is american. Potentially average out each odds from every sportsbook.
//How to check if a date is today javascript

// How to get any game by today.
// results.filter((gameData) => new Date().getDate() === new Date(gameData.commence_time).getDate())