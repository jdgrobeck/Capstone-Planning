//These are still a work in progress. I'm doing an axios.post on the front end that sends different data based on which team the user picks to win. Asking Mayra how to send that data from API to my personal database tomorrow.

const mysql = require('mysql')
let db = require("../utils/db");


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
    const spread = req.body.spread;
  
    try {
      // Check if the user already has a bet for the game
      const existingBet = await db.querySync(
        'SELECT * FROM bets WHERE user_id = ? AND game_id = ?',
        [userId, gameId]
      );
  
      if (existingBet.length > 0) {
        // Update the existing bet
        await db.querySync(
          'UPDATE bets SET commence_time = ?, home_team = ?, away_team = ?, sport = ?, pick = ?, spread = ? WHERE user_id = ? AND game_id = ?',
          [commenceTime, homeTeam, awayTeam, sport, pick, spread, userId, gameId]
        );
        res.sendStatus(200);
      } else {
        // Insert a new bet
        await db.querySync(
          'INSERT INTO bets (user_id, game_id, commence_time, home_team, away_team, sport, pick, spread) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [userId, gameId, commenceTime, homeTeam, awayTeam, sport, pick, spread]
        );
        res.sendStatus(201);
      }
    } catch (err) {
      console.log('Error creating/updating bet:', err);
      res.sendStatus(500);
    }
  };

  const updateBetById = (req, res) => {
    //This is used if a user changes their pick before the game starts. Do I need all this?
    let id = req.params.id;
    let gameId = req.body.game_id;
    let commence_time = req.body.commence_time;
    let sport = req.body.sport_key;
    // let pick = req.body.home_team;
    // let pick = req.body.away_team;
    // Will create an if statement that has different conditions if user chooses home or away team
    let params = [gameId, commence_time, sport, id];
  
    //Have to send request in order
    // Only want to update pick
    let sql = 'UPDATE bets '
    sql += 'SET pick = ? where id = ?'
  
    if(!id){
      res.sendStatus(400);
      return;
    }
  
  
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.log('updateBetById query failed ', err);
        res.sendStatus(400)
      } else {
        res.json(rows);
      }
    })
      
    }

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