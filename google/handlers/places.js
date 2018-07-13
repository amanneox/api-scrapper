const mongoose = require('mongoose');
const Promise = require('bluebird');
const validator = require('validator');
require('dotenv').config()

const mongoString = process.env.MONGO_URI // MONGO MONGO_URI
const gooleKey = process.env.GOOGLE_API   // GOOGLE KEY

const mongoString = process;

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id',
});

const dbExecute = (db, fn) => db.then(fn).finally(() => db.close());

function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl, { useMongoClient: true }), fn);
}
