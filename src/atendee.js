var R              = require('../vendor/ramda')
  , Request        = require('kakuna')

var attendeesEndpoint = R.curry(function(endpoint, event, param){
  return param ? 
      endpoint(event + '/attendees/' + param)
    : endpoint(event + '/attendees')   
})

var getList = R.curry(function(token, endpoint, id){
  return Request
    .get(endpoint(id, false))
    .set('Accept', 'application/json')
    .auth(token)
    .end()
    .then(R.path(['body', 'attendees']))
})

var get = R.curry(function(token, endpoint, event, attendee){
  return Request
    .get(endpoint(event, attendee))
    .set('Accept', 'application/json')
    .auth(token)
    .end()
    .then(R.path(['body', 'attendees', '0']))
})

var checkin = R.curry(function(token, endpoint, event, attendees){
  return Request
    .put(R.compose(endpoint(event), R.prop('code'), objectOrArray)(attendees))
    .set('Accept', 'application/json')
    .send(R.compose(R.prop('data'), objectOrArray)(attendees))
    .auth(token)
    .end()
    .then(R.prop('body'))
})

var objectOrArray = function(attendees){
  return Array.isArray(attendees) ?
    {code: 'check_all', data: {attendees: attendees}}
  : R.merge(attendees, {data: attendees})
}

module.exports = R.curry(function(api){
  var attendees = {
        endpoint : attendeesEndpoint(api.events.endpoint)
    ,   getList  : R.compose(getList(api.token), attendeesEndpoint)(api.events.endpoint)
    ,   get      : R.compose(get(api.token), attendeesEndpoint)(api.events.endpoint)
    ,   checkin  : R.compose(checkin(api.token), attendeesEndpoint)(api.events.endpoint)
  }
  return R.merge(api, {attendees: attendees})
})

