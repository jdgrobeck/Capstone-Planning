const express = require("express");
const cors = require('cors');


const path = require("path");

const app = express();

const port = process.env.PORT || 4001;

// Do I need this?
app.use(express.static('public'));

// app.use(bodyParser.json())

app.use(express.json())

const usersRoutes = require('./routers/usersRoutes');
let authRoutes = require("./routers/authRoutes");
let betsRoutes = require("./routers/betsRoutes");
let dataRoutes = require("./routers/dataRoutes");

app.use(cors());
app.use("/", authRoutes);
app.use('/users', usersRoutes);
app.use('/games', dataRoutes);

// app.use("/bets", betsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to our server!')
  // res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});