var Q = require("q");

var Status = function(args) {
  var parent = this;
  var args  = args || {};

  var verifyArgs = function() {

	  if (args.hasOwnProperty("text") && args.hasOwnProperty("body"))
	  	throw new Error("Arguments list length wrong");

	  if (args.hasOwnProperty("text")) {
	  	if (typeof args.text == "string")
		  	parent.text = args.text;
		  else
		  	throw new Error("Text must be a String");
		}

	  if (args.hasOwnProperty("body")) {
	  	if (typeof args.body == "object")
		  	setBodyParams();
		  else
		  	throw new Error("Body must be an Object");
		}		

  }

  var setBodyParams = function() {
  	parent.body = args.body;

  	parent.id 	= parent.body.id_str;
  	parent.text = parent.body.text;		  	
  	parent.user_id = parent.body.user.id_str;
  }

  parent.isQuestion = function() {
  	return true;
  }

  parent.send = function(url) {
    var bot = this;
    var params = {"status": parent.text};    
  	var deferred = Q.defer();

	  bot.auth.oauth.post(url,
                        bot.auth.access_token,
                        bot.auth.secret_access_token,
                        params,
                        function(e,data,res) { 
                          if (e) {
                            deferred.reject(e);         
                          } else {
                            deferred.resolve(data);
                          }
                        }
	  );  	

	  return deferred.promise;
  }

  verifyArgs();
}

module.exports = Status;