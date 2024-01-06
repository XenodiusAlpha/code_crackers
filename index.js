// declaring required variables for use in server setup
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// variable to use in middleware
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// declaring what port to use
const PORT = process.env.PORT || 3001;

// use mongodb connection through mongoose in config/connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server for social network api now running on port ${PORT}!`);
  });
});