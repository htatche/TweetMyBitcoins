var Q 				= require("q");

var Auth 	 		= require("./auth.js");
var Status 		= require("./status.js");
var Question 	= require("./question.js");
var Answer 	 	= require("./answer.js");

var Bot = function() {
	var self = this;

	self.authenticate = function() {
		self.auth = new self.Auth();
		self.auth.create();

		return self;
	}

	self.listen = function() {
		if (self.auth == undefined)
			throw new Error("You must authenticate first");

		var url = "https://userstream.twitter.com/1.1/user.json";
	  var req = self.auth.oauth.get(
	  						url,
						  	self.auth.access_token,
						    self.auth.secret_access_token
						  );  

	  req.addListener("response", function (res) {

	    res.setEncoding("utf8");

	    res.addListener("data", function (data) {
	    	console.log(data);
	    	
	    	var event = self.detectEvent(data);

	    	if (event != undefined) {
	    		var json = JSON.parse(data);
	    		self[event](json);
	    	}

	    });

	    res.addListener("end", function () {
	      throw new Error("I stopped listening.");
	    });

	  }).end();		

	  return self;
	}

	self.on = function(evt, callback) {
		self[evt] = callback;

		return self;
	}

	self.detectEvent = function(data) {
		var json, status;

    try {
    	json = JSON.parse(data);
    } catch (e) { return undefined; }  

		if (!json.hasOwnProperty("text"))
			return undefined;

		status = new Status({"body": json});

		if (status.isQuestion()) {
			return "question";
		} else {
			return undefined;
		}	
	}

	self.say = function(str) {
		if (self.auth == undefined)
			throw new Error("You must authenticate first");

		var url = "https://api.twitter.com/1.1/statuses/update.json",
				status = new self.Status({"text": str});

		status.send.call(self, url)
		.then(
		  function(data) {
		  	var json = JSON.parse(data);
		    console.log("Tweeted " + json.text + " !");
		  },
		  function(e) {
		  	console.error(e);
		  }  		    
		);			

		return self;
	}	

	self.ask = function(str) {
		var deferred = Q.defer();
		var error;

		try {
		  var question = new self.Question(str);
		} catch (e) {
			deferred.reject(e);
			return deferred.promise;
		}

		question.answer().then(
      function(str) {
        deferred.resolve(str);
      },
      function(e) {
        deferred.reject(e);
      } 			
		);

		return deferred.promise;
	}

	self.Auth = Auth;
	self.Auth.prototype.parent = self;	

	self.Status = Status;
	self.Status.prototype.parent = self;

};

Bot.prototype.Auth   		= Auth;
Bot.prototype.Question 	= Question;
Bot.prototype.Answer 		= Answer;

module.exports = Bot;