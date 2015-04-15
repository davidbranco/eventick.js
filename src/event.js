var R              = require('ramda')
  , Request        = require('superbird')
  , endpoint       = require('./url')

var eventEndpoint = function(param){
  return param ? 
      endpoint('events/' + param)
    : endpoint('events')   
}

var getList = R.curry(function(token, endpoint){
  return function(){
    return Request
      .get(endpoint())
      .set('Accept', 'application/json')
      .auth(token)
      .end()
      .then(R.path(['body', 'events']))
    }
})

var get = R.curry(function(token, endpoint, id){
  return Request
    .get(endpoint(id))
    .set('Accept', 'application/json')
    .auth(token)
    .end()
    .then(R.path(['body', 'events', '0']))
})


module.exports = R.curry(function(api){
  var events = {
        endpoint : eventEndpoint
    ,   getList  : getList(api.token, eventEndpoint)
    ,   get      : get(api.token, eventEndpoint)
  }
  
  return R.merge(api, {events: events})
})
