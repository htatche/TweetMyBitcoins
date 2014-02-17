var Q             = require("q"),
    Answer        = require("./answer.js");

var Question = function(str) {
  var self = this;

  this.setType = function() {

    if (str.match(/.*balance.*/i)) {
      self.type = "balance";
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

  this.setType();

  return self;
}

module.exports = Question;