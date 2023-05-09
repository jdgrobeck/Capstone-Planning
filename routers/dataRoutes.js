const express = require("express");
const dataController = require("../controllers/dataController");
const auths = require("../middleware/auths");
const router = express.Router();

router.get('/', dataController.getGames);


module.exports = router




