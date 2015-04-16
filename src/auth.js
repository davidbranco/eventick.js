var R         = require('../vendor/ramda')
  , Request   = require('kakuna')
  , endpoint  = require('./url')
  , event     = require('./event')
  , atendee   = require('./atendee')

var login = R.curry(function(user, password){
  return Request
    .get(endpoint('tokens'))
    .set('Accept', 'application/json')
    .auth(user, password)
    .end()
    .then(getLoggedApi, Oops)
    .catch(Oops)
})

var genApi = function(token){
  return {
    token: token
  }
}

var getLoggedApi = function(response){
  return R.compose(atendee, event, genApi, R.path(['body', 'token']))(response)
}

var Oops = function(e){
  console.log(e)
}

module.exports = {
  login: login
}
