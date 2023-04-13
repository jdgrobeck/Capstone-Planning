const express = require("express");
const dataController = require("../controllers/dataController");
const router = express.Router();

router.get('/', dataController.getGames);


module.exports = router

// const axios = require("axios");
// require("dotenv").config();


// const list = (req, res) => {

// const options = {
//   method: 'GET',
//   url: 'https://article-extractor2.p.rapidapi.com/article/parse',
//   params: {url: 'https://greatergood.berkeley.edu/article/item/what_is_your_purpose_as_a_father'},
//   headers: {
//     'X-RapidAPI-Key': process.env.SECRET_KEY,
//     'X-RapidAPI-Host': 'article-extractor2.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	res.json(response.data.data);
// }).catch(function (error) {
// 	console.error(error);
// });
// }



