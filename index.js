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


//Registration works with and without below code in "Production"

app.options("*", cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
  );
  next();
});

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   // !!THiS IS FOR DEV - We replace this once we have our production URL in place.
 
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://capstone-planning.vercel.app/" // or whatever port/domain your client is using
//   );

//   // Request methods you wish to allow
//   res.setHeader("Access-Control-Allow-Methods", "POST");

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

app.use("/", authRoutes);
app.use('/users', usersRoutes);
app.use('/dashboard', dataRoutes);
app.use("/bets", betsRoutes);



app.get('/', (req, res) => {
  res.send('Welcome to our server!')
  // res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});