// Proof of Concept 

var Status = function(json) {
  var _this = this;

	_this.text = json.text;
	_this.user_id = json.user_id;
  _this.reply_to_id = json.in_reply_to;

  _this.isQuestion = function() {
    // Determine if it's a question
    // regxp with What/How 
  }

  return _this;
}

var Answer = function(status_id, question_type) {
  var _this = this;

	_this.url    = "http://api.twitter.com/...";
  _this.params = {
    "in_reply_to_status_id": status_id,
    "status":                null
  };

	this.createBalanceAnswer = function() {
    _this.params.status = msg;

    return _this;
	}

	this.createAnswer = function() {
		switch (question_type) {
			case "balance": 		  return createBalanceAnswer() 
			case "info": 			    return createInfoAnswer()
			case "market_price": 	return createMarketPriceAnswer() 
			else:
				throw new Error("Not user petition");
		}
	}

  _this.send = function() {
    oauth.post(_this.url, _this.params);
  };    

	this.createAnswer();

  return _this;
}

var Question = function(status) {
  // Inheritate Status

	var _this = this;

	this.setType: function() {
		if (status.text.match(/.*balance.*/)) {
			_this.type = "balance";
		} else if (status.text.match(/.*price.*/)) {
			_this.type = "price";
		} else {
			throw new Error("No valid question");
		}	
	}

	_this.getReply: function() {
    var question_type =_this.type;

		return new Reply(status.id, _this.type);
	}

	_this.answer: function() {
		_this.getReply.send();
	}

	_this.getDirectMessageReply: function(answer_type) {
		return new DirectMessage(status.id, user.id, msg);
	}		

	this.privateAnswer: function() {
		_this.directMessageReply.send();
	}	

  this.setType();

  return _this;
}

exports.parseData = function(json) { 

  var status = new Status(json);  

  if (status.isQuestion()) {
    var question = new Question(json);

    question.answer();
  } else if (status.isOrder)
    ...
  } else {
    throw new Error("No Enquiry")
  }
 
};  