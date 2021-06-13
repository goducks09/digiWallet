const express = require('express'),
      expressSession = require('express-session'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      app = express(),
      path = require('path'),
      User = require('./models/user'),
      indexRoutes = require('./routes/index'),
      cardRoutes = require('./routes/cards'),
      port = process.env.PORT || 5000;
require('dotenv').config();

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
      "https://localhost:3000"
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

//Serve static files if in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('/app/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join('/', 'app', 'build', 'index.html'));
  });
}

//Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});