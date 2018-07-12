const mongoose = require('mongoose')
const Promise = require('bluebird')
const validator = require('validator')
const UserModel = require('../model/User.js')
const request = require('request')
const oauth2 = require('../utils/config.js')
require('dotenv').config()
mongoose.Promise = Promise;

const mongoString = process.env.MONGO_URI // Change this to your own MONGO_URI
const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id',
});

const dbExecute = (db, fn) => db.then(fn).finally(() => db.close())

function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl, { useMongoClient: true }), fn)
}
module.exports.userData = (event, context, callback) => {
  
}
