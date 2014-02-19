var Status = function(args) {
  var self = this;
  var args = args || {};

  self.setBodyParams = function(args) {
  	self.body = args.body;
  }

  self.setBodyParams(args);

  return self;
};

var Question = function(args) {
  var self = this;
  var args = args || {};

  self.setBodyParams(args);

  return self;
}

Question.prototype = new Status();
Question.prototype.constructor = Question;

var question = new Question({"body": "IAMA BODY"});

console.log(question.body);