//These are still a work in progress. I'm doing an axios.post on the front end that sends different data based on which team the user picks to win. Asking Mayra how to send that data from API to my personal database tomorrow.


const express = require('express')
const betsController = require('../controllers/betsController')
const auths = require("../middleware/auths")
const router = express.Router()

router.get('/', betsController.getAllBets)

router.get('/:id', betsController.getBetsByUserId)

router.post('/', betsController.createBet)
// Don't need this because I'm doing an axios.post when the user makes their pick

router.put('/:id', betsController.updateBetById)

router.delete('/:id', betsController.deleteBetById)

module.exports = router