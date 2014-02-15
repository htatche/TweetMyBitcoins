var Auth 	 = require("./auth.js");
var Status = require("./status.js");

var Bot = function() {
	var parent = this;

	parent.authenticate = function() {
		parent.auth = new parent.Auth();
		parent.auth.create();

		return parent.auth;
	}

	parent.say = function(str) {
		if (parent.auth == undefined)
			throw new Error("You must authenticate first");

		var url = "https://api.twitter.com/1.1/statuses/update.json",
				status = new parent.Status({"text": str});

		status.send.call(parent, url)
		.then(
		  function(data) {
		  	var json = JSON.parse(data);
		    console.log("Tweeted " + json.text + " !");
		  },
		  function(e) {
		  	console.error(e);
		  }  		    
		);			

		return parent;
	}	

};

Bot.prototype.Status = Status;
Bot.prototype.Auth   = Auth;

module.exports = Bot;