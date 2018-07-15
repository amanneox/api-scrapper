const mongoose = require('mongoose')
const Promise = require('bluebird')
const validator = require('validator')
const GooglePlaces = require('node-googleplaces')
require('dotenv').config()
const mongoString = process.env.MONGO_URI // MONGO MONGO_URI
const googleKey = process.env.GOOGLE_API   // GOOGLE KEY

mongoose.Promise = Promise;

const places = new GooglePlaces(googleKey)
const params = {
  location: '49.250964,-123.102192',
  radius: 1000
};

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id',
});

const dbExecute = (db, fn) => db.then(fn).finally(() => db.close());

function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl, { useMongoClient: true }), fn);
}


module.exports.nearbySearch = (event, context, callback) => {
  const query = {
    ...params
  }
  places.nearbySearch(query, (err, res) => {
  console.log(res.body)
  if (err) {
    callback(null, { statusCode: 200, body: err })
  }
  else {
      callback(null, { statusCode: 200, body: res })
  }
})

}
