var Q     				= require("q"),
		blockchain 		= require("../data/blockchain.js"),
    utilities    	= require('../utilities.js');    

var Answer = function(question_type, str) {
  var self = this;
  
  self.question = str

	self.findBalanceAnswer = function() {
	  var deferred = Q.defer();
	  var address = utilities.extractBitcoinAddress(self.question);

	  blockchain.getBalance(address)
	  .then(
	    function(satoshis) {
	      var bitcoins = satoshis * 0.00000001;
	      var str = bitcoins.toString();

	      deferred.resolve(str);
	    },
	    function(e) {   
	      deferred.reject(e);
	    }
	  ) 

	  return deferred.promise;
	}

	self.find = function() {
	  var deferred = Q.defer();

		switch (question_type) {
			case "balance": 		  
				self.findBalanceAnswer().then(
					function(str) {	deferred.resolve(str); },
					function(e)   { deferred.reject(e); 	 }					
				);
				break;

			default:
				var e = new Error("Not user petition");			
				deferred.reject(e);
		}

		return deferred.promise;
	}

  return self;
}

module.exports = Answer;