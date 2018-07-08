const zomato = require('../../utils/zomato')
const Promise = require('bluebird');
const validator = require('validator');

const credentials = "e1c80cc77b793e27451250777ce1a808"
const client = zomato.createClient({
  userKey: credentials,
})

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
  const data = JSON.parse(event.body);
  const request = {
    q:data.cityName, //query by city name
    lat:data.lat, //latitude
    lon:data.lng, //longitude
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
