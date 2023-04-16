
const mysql = require('mysql')
let db = require("../utils/db"); //imports connection from datbase


const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  let sql = 'SELECT * FROM users u ' 
  // sql += 'JOIN bets b ON u.id = b.user_id' Not sure if I need this yet

  db.query(sql, (err, rows) => {
    if (err) {
      console.log('getAllUsers query failed ', err)
      res.sendStatus(500)
    } else {
      res.json(rows);
    }
  })

  
}

const getUsersById = (req, res) => {
     // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let id = req.params.id;
  //params will always be an array
  let params = [id];


  let sql = 'SELECT * FROM users u ' 
  sql += 'JOIN bets b ON u.id = b.user_id ' 
  sql += ' AND u.id = ?'; // works but BAD! Because they can enter any route. Called a sql injection
                          // question mark calls params. Called paramatized statement
                          // Don't bring variables directly into queries from the outside

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log('getUserById query failed ', err)
      res.sendStatus(500)
    } else {
      res.json(rows);
    }
  })
  }

const updateUserById = (req, res) => {
  let id = req.params.id;
  let fullName = req.body.fullName;
  let username = req.body.username;
  let email = req.body.email;
  let params = [fullName, username, email, id];

  //Have to send request in order
  let sql = 'UPDATE users '
  sql += 'SET full_name = ?, username = ?, email = ? where id = ?'

  if(!id){
    res.sendStatus(400);
    return;
  }


  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log('updateUserById query failed ', err);
      res.sendStatus(400)
    } else {
      res.json(rows);
    }
  })
    
  }

const deleteUserById = (req, res) => {
    let id = req.params.id; // path would be /users/2
    let params = [id];
  
    if(!id){
      res.sendStatus(400);
      return;
    }
  
    let sql = 'DELETE FROM users WHERE id = ?'
    // WHAT GOES IN THE BRACKETS
    
  
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.log('deleteUserById query failed', err)

      } else {
        return res.json({ message: `Deleted ${rows.affectedRows} user(s)` });
      }
    })

   
    
  }


  module.exports = {
    getAllUsers,
    getUsersById,
    updateUserById,
    deleteUserById
  }