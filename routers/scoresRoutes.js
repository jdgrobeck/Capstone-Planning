const express = require("express");
const scoresController = require("../controllers/scoresController");
// const auths = require("../middleware/auths");
const router = express.Router();

router.get('/', scoresController.getScores);


module.exports = router