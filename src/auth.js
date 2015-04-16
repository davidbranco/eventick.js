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
})

var genApi = function(token){
  return {
    token: token
  }
}

var getLoggedApi = function(response){
  return R.compose(atendee, event, genApi, R.path(['body', 'token']), checkForErrors)(response)
}

var checkForErrors = function(res){
  return res.ok ? res : Oops()
}

var Oops = function(){
  throw new Error('Not able to login.')
}

module.exports = {
  login: login
}
