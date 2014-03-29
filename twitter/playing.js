// Pattern definition

var Pattern = function(regexp, events, callback) {
	var _this = this;

  _this.regexp = regexp;
  _this.callback = callback;
  _this.events = events;

};

Pattern.find = function(str) {
	var array = patterns.filter(function(p) {
		return p.test(str);	
	})

	if (array.length) { 
		pattern = array[0]
		return pattern;
	} else {
		return false;
	}  	

}

Pattern.prototype.test = function(str) {
	debugger;
	return this.regexp.test(str);
};

Pattern.prototype.emitSignal = function() {
	return this.callback();
};

// Event definition

var Event = function(name, callback) {
	var _this = this;

	_this.name = name;

	_this.callback();
}

// Usage of Pattern + Event

var question_event = new Event("Question", function(json) {
	var question = new Question({"body": json});
	
	return question;
});

var question_pattern = new Pattern(/(What)/, "Question");

bot.listen = function() {
	...
	var matching_patterns = Pattern.find(json.text)
	matching_patterns.forEach(function() {pattern.emitSignal()})
	...
}

bot.listen() // If we receive a tweet, it will parse it, match it to a pattern,
             // and the pattern object will emit the signal "Question"

bot.on("Question") // 



var question_pattern = new Pattern(/(What)/, "Question");
var question_pattern = new Pattern(/(time)/, "time");
var question_pattern = new Pattern(/(nigeria)/, "nigeria");

new Event.Wrapper("Question", "time", "nigeria")


// By creating events, we can set up an events tree

	bot.listen().on("question about time in nigeria", function() {
		// do something with a question about time in nigeria.
	})


// Each event returns a callback with different params

	// Event.Question()
	bot.listen().on("question", function(question, answer) {
		bot.send(answer);
		answer.reply();
		question.answer().retweet();
	})
