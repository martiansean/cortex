const express = require("express");
const httpsRedirect = require('express-https-redirect');
const path = require("path");
const mongoose = require("mongoose")
// const exphbs = require("express-handlebars");
const session = require("express-session");
const {ensureAuthenticated} = require('./helpers/auth');
const bodyParser = require("body-parser");
const passport = require("passport")


const app = express();

require('./models/Question');
const Unit = mongoose.model('questions')

require('./models/User')
const User = mongoose.model('users')



// Passport Config
require('./config/passport')(passport);

const api = require('./controllers/api')
const users = require('./controllers/users');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
const MongoURI = 'mongodb://sean:sean@quiz-shard-00-00-gmxvf.mongodb.net:27017,quiz-shard-00-01-gmxvf.mongodb.net:27017,quiz-shard-00-02-gmxvf.mongodb.net:27017/test?ssl=true&replicaSet=quiz-shard-0&authSource=admin&retryWrites=true&w=majority'
const conn = mongoose.connect(
  MongoURI,
  // {
  //   useMongoClient: true
  // }
  { useNewUrlParser: true,
   useUnifiedTopology: true }
)
console.log("mongo is running")

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', httpsRedirect());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  // res.sendFile('public/login.html', {root: __dirname } )
  res.redirect('/login')
})

app.get('/login', (req,res) => {
  res.sendFile('public/login.html', {root: __dirname } )
})

app.get('/register', (req,res) => {
  res.sendFile('public/register.html', {root: __dirname } )
})

app.get('/playground',ensureAuthenticated, (req,res) => {
  res.sendFile('public/playground.html', {root: __dirname})
})

app.get('/rank',ensureAuthenticated, (req,res) => {
  res.sendFile('public/rank.html', {root:__dirname})
})
//use routes
app.use('/api', api);
app.use('/users', users);

// app.use(function(req, res, next){
//   res.status(404);
//   res.sendFile('public/404.html', {root: __dirname } )
// });



//const port = 5000;

// app.listen(port, () => {
//  console.log(`Server started on port ${port}`);
//});
 app.listen(process.env.PORT);
