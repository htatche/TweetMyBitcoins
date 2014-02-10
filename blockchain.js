// Blockchain Query API
// https://blockchain.info/q

// Address balance
// /q/addressbalance/$address?confirmations=$n

var Q    = require("q");
var http = require("http");

exports.query = function(options) {
  var deferred = Q.defer();

  var req = http.request(options, function(response) {
    var data = '';
    response.on('data', function (chunk) {     
      data += chunk;
    });

    response.on('end', function () {    
      deferred.resolve(data);
    });

  });
  
  req.end();  

  return deferred.promise;
}

exports.getBalance = function(address) {
  var deferred = Q.defer();

  console.log ("Asking balance of " + address + " to Blockchain")

  var options = {
    hostname: 'blockchain.info',
    port: 80,
    path: '/q/addressbalance/'+ address + '?confirmations=6',
    method: 'GET'
  };  

  this.query(options)
  .then(
    function(balance) {
      if (parseInt(balance)) {
        deferred.resolve(balance);        
      } else {
        error = new Error("Can't retreive balance of this address");
        deferred.reject(error);        
      }
    } 
  );

  return deferred.promise;  
}