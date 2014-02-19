var Q = require("q");

var Status = function(args) {
  var self = this;
  var args = args || {};

  self.verifyArgs = function(args) {

	  if (args.hasOwnProperty("text") && args.hasOwnProperty("body"))
	  	throw new Error("Arguments list length wrong");

	  if (args.hasOwnProperty("text")) {
	  	if (typeof args.text == "string")
		  	self.text = args.text;
		  else
		  	throw new Error("Text must be a String");
		}

	  if (args.hasOwnProperty("body")) {
	  	if (typeof args.body == "object")
		  	self.setBodyParams(args);
		  else
		  	throw new Error("Body must be an Object");
		}		

  }

  self.setBodyParams = function(args) {
  	self.body = args.body;

  	self.id 	= self.body.id_str;
  	self.text = self.body.text;		  	
  	self.user_id = self.body.user.id_str;
  }

  self.isQuestion = function() {
    return (self.text.match(/.*(What|How much).*/i))
    ? true
    : false
  }

  self.send = function(url, params) {
    var params = params || {"status": self.text};
  	var deferred = Q.defer();
    var auth = self.parent.auth;

	  auth.oauth.post(
      url,
      auth.access_token,
      auth.secret_access_token,
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

  self.reply = function(answer) {
    var url = "https://api.twitter.com/1.1/statuses/update.json",
        params = {"in_reply_to_status_id": self.id, "status": answer};
    
    self.send(url, params).then(
      function(data) {
        var json = JSON.parse(data);
        console.log("Tweet #" + self.id + " has been replied with " + json.text);
      },
      function(e) {
        console.error(e);
      }         
    );  

    return self;
  }

  self.verifyArgs(args);

  return self;
}

module.exports = Status;