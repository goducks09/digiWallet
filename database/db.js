const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      app = express(),
      indexRoutes = require('./routes/index'),
      cardRoutes = require('./routes/cards');
require('dotenv').config();

//Connect to MongoDB server
//TODO move password to env variable
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
    next();
  });

app.use(indexRoutes);
app.use(cardRoutes);


//Start server
app.listen(5000, () => {
    console.log('Server started port 5000');
});