var Auth 	 = require("./auth.js");
var Status = require("./status.js");

var Bot = function() {
	var parent = this;

	parent.authenticate = function() {
		parent.auth = new parent.Auth()
		parent.auth.create()
	}

};

Bot.prototype.Status = Status;
Bot.prototype.Auth = Auth;

module.exports = Bot;