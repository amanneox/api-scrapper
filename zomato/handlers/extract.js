const path = require('path')

const zomato = require('../utils/zomato')

const Promise = require('bluebird');
const validator = require('validator');
require('dotenv').config()
const credentials = process.env.ZOMATO_API // Replace With Your Zomato Key
const client = zomato.createClient({
  userKey: credentials,
})
const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id',
});

module.exports.getCategories = (event, context, callback) => {
  client.getCategories(null, function(err, result){
    if (err) {
    callback(null, { statusCode: 200, body: err })
    }
    else {
    callback(null, { statusCode: 200, body: result })
    }

  })
}

module.exports.getCity = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const request = {
    q:data.cityName, //query by city name
    lat:data.lat, //latitude
    lon:data.lon, //longitude
    city_ids:data.cityID, //comma separated city_ids value
    count:data.count // number of maximum result to display
  }

  client.getCities(request, function(err, result){
    if (err) {
    callback(null, { statusCode: 200, body: err })
    }
    else {
    callback(null, { statusCode: 200, body: result })
    }
  })
}

module.exports.getCuisines = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const request = {
    lat:data.lat, //latitude
    lon:data.lon, //longitude
    city_id:data.cityID, //comma separated city_ids value
  }

  client.getCuisines(request, function(err, result){
    if (err) {
    callback(null, { statusCode: 200, body: err })
    }
    else {
    callback(null, { statusCode: 200, body: result })
    }

  })
}

module.exports.getEstablishments = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const request = {
    lat:data.lat, //latitude
    lon:data.lon, //longitude
    city_id:data.cityID, //comma separated city_ids value
  }

  client.getEstablishments(request, function(err, result){
    if (err) {
    callback(null, { statusCode: 200, body: err })
    }
    else {
    callback(null, { statusCode: 200, body: result })
    }

  })
}

module.exports.getGeocode = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const request = {
    lat:data.lat, //latitude
    lon:data.lon, //longitude
  }

  client.getGeocode(request, function(err, result){
    if (err) {
    callback(null, { statusCode: 200, body: err })
    }
    else {
    callback(null, { statusCode: 200, body: result })
    }

  })
}

module.exports.getCollections = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const request = {
    city_id: data.cityID,
    count: data.count,
    lat:data.lat, //latitude
    lon:data.lon, //longitude
  }

  client.getCollections(request, function(err, result){
    if (err) {
    callback(null, { statusCode: 200, body: err })
    }
    else {
    callback(null, { statusCode: 200, body: result })
    }

  })
}

module.exports.getLocations = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const request = {
    query: data.cityName,
    count: data.count,
    lat:data.lat, //latitude
    lon:data.lon, //longitude
  }

  client.getLocations(request, function(err, result){
    if (err) {
    callback(null, { statusCode: 200, body: err })
    }
    else {
    callback(null, { statusCode: 200, body: result })
    }

  })
}

module.exports.getLocationDetails = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const request = {
    entity_id:data.entityID, //location id obtained from locations api
    entity_type:data.entityType //location type obtained from locations api
  }

  client.getLocationDetails(request, function(err, result){
    if (err) {
    callback(null, { statusCode: 200, body: err })
    }
    else {
    callback(null, { statusCode: 200, body: result })
    }

  })
}

module.exports.getDailyMenu = (event, context, callback) => {
  try {
  const data = JSON.parse(event.body)
  const request = {
    res_id:data.resID,
  }
  client.getDailyMenu(request, function(err, result){
    console.log(request)
    if (err) {
    callback(null, { statusCode: 400, body: err })
    }
    else {
    callback(null, { statusCode: 200, body: result })
    }
  })
} catch (e) {
  console.log(e)
  callback(null, { statusCode: 500, body: e })
}

}

module.exports.getRestaurant = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const request = {
    res_id: data.resID
  }

  client.getRestaurant(request, function(err, result){
    if (err) {
    callback(null, { statusCode: 200, body: err })
    }
    else {
    callback(null, { statusCode: 200, body: result })
    }

  })
}

module.exports.getReviews = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const request = {
    res_id: data.resID,
    start : data.start , //fetch results after this offset (Integer)
    count: data.count,// max number of results to retrieve
  }
  client.getReviews(request, function(err, result){
    if (err) {
    callback(null, { statusCode: 200, body: err })
    }
    else {
    callback(null, { statusCode: 200, body: result })
    }

  })
}

module.exports.zomatoSearch = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const request = {
    entity_id: data.entityID,//location id
    entity_type:data.group, // location type (city,subzone,zone , landmark, metro,group)
    q: data.keyword ,//Search Keyword
    lat: data.lat, //latitude
    lon: data.long, //longitude
    count: data.count, // number of maximum result to display
    start: data.start , //fetch results after offset
    radius: data.radius , //radius around (lat,lon); to define search area, defined in meters(M)
    cuisines : data.cuisines , //list of cuisine id's separated by comma
    establishment_type : data.establishmentType , //estblishment id obtained from establishments call
    collection_id : data.collectionId , //collection id obtained from collections call
    category :  data.category ,//	category ids obtained from categories call
    sort : data.sort ,//choose any one out of these available choices
    order: data.order //	used with 'sort' parameter to define ascending(asc )/ descending(desc)
  }

  client.zomatoSearch(request, function(err, result){
    if (err) {
    callback(null, { statusCode: 200, body: err })
    }
    else {
    callback(null, { statusCode: 200, body: result })
    }

  })
}
