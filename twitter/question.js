var Q             = require("q"),
    Status        = require("./status.js"),
    Answer        = require("./answer.js");

var Question = function(args) {
  var self = this;

  var args = args || {};

  var str = args.body.text;

  self.setType = function() {

    if (str.match(/.*balance.*/i)) {
      self.type = "balance";
    } else if (str.match(/.*(price|value).*/i)) {
      self.type = "price";
    } else if (str.match(/.*(price|value).*/i)) {
      self.type = "price";      
    } else {
      throw new Error("Unrecognizable question");
    }

  }

  self.answer = function() {
    var deferred = Q.defer();
    var answer   = new Answer(self.type, str);

    answer.find().then (
      function(str) {
        deferred.resolve(str);
      },
      function(e) {
        deferred.resolve(e);
      }      
    )

    return deferred.promise;
  }

  self.verifyArgs(args); // Status
  self.setType();

  return self;
}

Question.prototype = new Status();
Question.prototype.constructor = Question;

module.exports = Question;