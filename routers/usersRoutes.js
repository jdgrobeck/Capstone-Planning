const express = require('express')
const usersController = require('../controllers/usersController')
const auths = require("../middleware/auths")
const router = express.Router()

router.get('/', usersController.getAllUsers)

// Does this need to be /users/:id?
router.get('/:id', usersController.getUsersById)

// router.post('/register', auths.checkJWT, usersController.createUser)

// Does this need to be /users/:id?
router.put('/:id', usersController.updateUserById)

// Does this need to be /users/:id?
router.delete('/:id', usersController.deleteUserById)

module.exports = router