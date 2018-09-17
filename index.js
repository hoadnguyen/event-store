require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const db = require('./src/db');
const store = require('./src/store');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger('dev'));
app.use(bodyParser.json());

// Config routes
app.use(store.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'The url you want to access does not exist'));
});

// REST server running on port 9002
const PORT = process.env.SERVER_PORT;

// MONGO DB CONFIG
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

// Start MONGO DB connection
db.connect(DB_URL, DB_NAME)
.subscribe((dbClient) => {
  // Configure store
  store.config(dbClient);
  // Start server
  app.listen(PORT, () => {
    console.log(`post-listing listening on ${PORT}`);
  })
})

module.exports = app;
