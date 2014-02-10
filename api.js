var blockchain = require('./blockchain.js');
var Q          = require("q");

exports.balance = function(query) {

  deferred = Q.defer();

  if (query.hasOwnProperty("address")) {
    blockchain.getBalance(query.address)
    .then(function(satoshis) {
      bitcoins = satoshis / 0.00000001
      deferred.resolve(bitcoins);
    })
  }
  return deferred.promise;
}