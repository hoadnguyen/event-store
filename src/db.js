const MongoClient = require('mongodb').MongoClient;
const { Observable } = require('rxjs/Rx');

const connect = (url, dbName) => {
  const mongoConnectObs = Observable.bindNodeCallback(MongoClient.connect);
  return mongoConnectObs(url, {useNewUrlParser: true}).map(client => {
    console.log(`Connected to DB at ${url}`)
    return client.db(dbName);
  })
}

module.exports = { connect };