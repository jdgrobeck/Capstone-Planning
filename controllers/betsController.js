//These are still a work in progress. I'm doing an axios.post on the front end that sends different data based on which team the user picks to win. Asking Mayra how to send that data from API to my personal database tomorrow.

const mysql = require('mysql')
let db = require("../utils/db");
const axios = require("axios")


const getAllBets = (req, res) => {
    // SELECT ALL Bets
    let sql = 'SELECT * FROM bets b ' 
    // Don't need this
    // sql += 'JOIN users u ON b.user_id = u.id' 
  
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('getAllBets query failed ', err)
        res.sendStatus(500)
      } else {
        res.json(rows);
      }
    })
}

const getBetsByUserId = (req, res) => {
        // SELECT Bets WHERE ID = <REQ PARAMS ID>
  let id = req.params.id;
  //params will always be an array
  let params = [id];


  let sql = 'SELECT * FROM bets ' 
  sql += 'WHERE user_id = ?' 
  // sql += 'JOIN users u ON b.user_id = u.id ' 
  // sql += ' AND u.id = ?'; // works but BAD! Because they can enter any route. Called a sql injection
                          // question mark calls params. Called paramatized statement
                          // Don't bring variables directly into queries from the outside

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log('getBetById query failed ', err)
      res.sendStatus(500)
    } else {
      res.json(rows);
    }
  })
    
  }


  const createBet = async (req, res) => {
  const userId = req.body.user_id;
  const gameId = req.body.game_id;
  const commenceTime = req.body.commence_time;
  const homeTeam = req.body.home_team;
  const awayTeam = req.body.away_team;
  const sport = req.body.sport;
  const pick = req.body.pick;
  const odds = req.body.odds;
  const spread = req.body.spread;
  const result = req.body.result; // Add result to the parameters
  
  try {
    // Check if the user already has a bet for the game
    const existingBet = await db.querySync(
      'SELECT * FROM bets WHERE user_id = ? AND game_id = ?',
      [userId, gameId]
    );

    if (existingBet.length > 0) {
      // Update the existing bet
      await db.querySync(
        'UPDATE bets SET commence_time = ?, home_team = ?, away_team = ?, sport = ?, pick = ?, odds = ?, spread = ?, result = ? WHERE user_id = ? AND game_id = ?',
        [commenceTime, homeTeam, awayTeam, sport, pick, odds, spread, result, userId, gameId]
      );
      res.sendStatus(200);
    } else {
      // Insert a new bet
      await db.querySync(
        'INSERT INTO bets (user_id, game_id, commence_time, home_team, away_team, sport, pick, odds, spread, result) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, gameId, commenceTime, homeTeam, awayTeam, sport, pick, odds, spread, result]
      );
      res.sendStatus(201);
    }
  } catch (err) {
    console.log('Error creating/updating bet:', err);
    res.sendStatus(500);
  }
};

// updates pick and result
// const updateBetById = (req, res) => {
//   const id = req.params.id;
//   const gameId = req.body.game_id;
//   const homeTeam = req.body.home_team;
//   const awayTeam = req.body.away_team;
//   const pick = req.body.pick;

//   if (!id) {
//     res.sendStatus(400);
//     return;
//   }

//   // Retrieve the scores data from the scores API
//   axios.get('https://capstone-planning.vercel.app/scores')
//     .then(scoresResponse => {
//       const scoresData = scoresResponse.data;
//       // Find the game with the corresponding gameId
//       const game = scoresData.find(score => score.id === gameId);

//       let result;
//       if (game && game.scores) {
//         const homeScore = parseInt(game.scores[0].score);
//         const awayScore = parseInt(game.scores[1].score);

//         // Perform the result calculation based on the pick and the scores
//         if (
//           (pick === homeTeam && homeScore > awayScore) ||
//           (pick === awayTeam && awayScore > homeScore)
//         ) {
//           result = 'W';
//         } else {
//           result = 'L';
//         }
//       } else {
//         result = 'N/A';
//       }

//       // Update the "pick" and "result" values in the database for the specific bet record
//       const sql = 'UPDATE bets SET pick = ?, result = ? WHERE id = ?';
//       const params = [pick, result, id];

//       db.query(sql, params, (err, rows) => {
//         if (err) {
//           console.log('updateBetById query failed', err);
//           res.sendStatus(400);
//         } else {
//           // Send the response indicating success
//           res.sendStatus(200);
//         }
//       });
//     })
//     .catch(error => {
//       console.log('Failed to fetch scores data', error);
//       res.sendStatus(500);
//     });
// };

// Just updates result

const updateBetById = (req, res) => {
  const id = req.params.id;
  const gameId = req.body.game_id;
  const homeTeam = req.body.home_team;
  const awayTeam = req.body.away_team;

  if (!id) {
    res.sendStatus(400);
    return;
  }

  // Retrieve the scores data from the scores API
  axios.get('https://capstone-planning.vercel.app/scores')
    .then(scoresResponse => {
      const scoresData = scoresResponse.data;
      // Find the game with the corresponding gameId
      const game = scoresData.find(score => score.id === gameId);

      let result;
      if (game && game.scores) {
        const homeScore = parseInt(game.scores[0].score);
        const awayScore = parseInt(game.scores[1].score);

        // Perform the result calculation based on the pick and the scores
        if (
          (homeTeam && homeScore > awayScore) ||
          (awayTeam && awayScore > homeScore)
        ) {
          result = 'W';
        } else {
          result = 'L';
        }
      } else {
        result = 'N/A';
      }

      // Update the "result" value in the database for the specific bet record
      const sql = 'UPDATE bets SET result = ? WHERE id = ?';
      const params = [result, id];

      db.query(sql, params, (err, rows) => {
        if (err) {
          console.log('updateBetById query failed', err);
          res.sendStatus(400);
        } else {
          // Send the response indicating success
          res.sendStatus(200);
        }
      });
    })
    .catch(error => {
      console.log('Failed to fetch scores data', error);
      res.sendStatus(500);
    });
};

  const deleteBetById = (req, res) => {
    let id = req.params.id; // path would be /bets/201
    let params = [id];
  
    if(!id){
      res.sendStatus(400);
      return;
    }
  
    let sql = 'DELETE FROM bets WHERE id = ?'
    // WHAT GOES IN THE BRACKETS
    
  
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.log('deleteUserById query failed', err)

      } else {
        return res.json({ message: `Deleted ${rows.affectedRows} bet(s)` });
      }
    })

    
    
  }

  module.exports = {
    getAllBets,
    getBetsByUserId,
    createBet,
    updateBetById,
    deleteBetById
  }