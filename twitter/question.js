var Question = function(status) {
  var _this = this;

  this.setType: function() {
    if (status.text.match(/.*balance.*/))
      _this.type = "balance";
      return;

    if (status.text.match(/.*price.*/))
      _this.type = "price";
      return;      

    throw new Error("No valid question");
  }

  _this.answer: function() {
    var question_type = _this.type;

    return new Answer(status.id, _this.type);
  }

  _this.reply: function() {
    _this.answer().send();
  }

  this.setType();

  return _this;
}

module.exports = Question;