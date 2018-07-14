const mongoose = require('mongoose')
const Promise = require('bluebird')
const validator = require('validator')
require('dotenv').config()
const googlePlaces = require('node-googleplaces')
const mongoString = process.env.MONGO_URI // MONGO MONGO_URI
const googleKey = process.env.GOOGLE_API   // GOOGLE KEY

const mongoString = process;

const places = new googlePlaces(googleKey)

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id',
});

const dbExecute = (db, fn) => db.then(fn).finally(() => db.close());

function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl, { useMongoClient: true }), fn);
}

const params = {
  location: '49.250964,-123.102192',
  radius: 1000
}

module.exports.nearbySearch = (event, context, callback) => {
  places.nearbySearch(query).then((res) => {
    console.log(res.body)
  })
}
