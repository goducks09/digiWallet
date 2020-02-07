const express = require('express'),
      expressSession = require('express-session'),
      flash = require('connect-flash'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      app = express(),
      User = require('./models/user'),
      indexRoutes = require('./routes/index'),
      cardRoutes = require('./routes/cards');
require('dotenv').config();
//TODO add flash messages
//Connect to MongoDB server
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then( () => {
    console.log("Connected to DB");
}).catch( err => {
    console.log('Error: ', err.message);
});

//App settings
app.use(bodyParser.urlencoded({extended: true}));
mongoose.set('useFindAndModify', false);
app.use(flash());

//Passport authentication settings
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Use Express Router for route paths
app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "http://localhost:3000"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,DELETE"
    );
    res.header(
      "Access-Control-Allow-Credentials",
      "true"
    );
	  
    next();
  });

app.use(indexRoutes);
app.use(cardRoutes);


//Start server
app.listen(5000, () => {
    console.log('Server started port 5000');
});