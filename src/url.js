var Base = {
      url: 'https://www.eventick.com.br/'
  ,   api: 'api/v1/'
  ,   end: '.json'
}

module.exports = function(path){
  return Base.url + Base.api + path + Base.end
}
