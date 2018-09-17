const moment = require('moment');
const status = require('http-status');
const express = require('express');
const router = express.Router();
const amqp = require('./amqp');

let mongo;

const config = (client) => {
  mongo = client;
}

router.post('/events/:name', (req, res, next) => {
  const event = req.body;
  const eventName = req.params.name;
  const eventObj = {
    eventName,
    data,
    timestamp: moment().valueOf(),
  };

  const eventsCol = mongo.collection('events');
  eventsCol.insertOne(eventObj).then(result => {
    if (result.acknowledged) {
      amqp.send(eventName, data);
      return res.sendStatus(200);
    }
    else return res.sendStatus(status.SERVICE_UNAVAILABLE);
  });
});

module.exports = {
  config,
  router,
}