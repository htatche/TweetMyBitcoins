== Patterns matching ==

var Pattern = function(regexp, name, parent) {
	var _this = this;

	_this.parent = parent || false;
}

BITCOIN

	Question

	  Price|Value
	          At
	          In

	  Balance
	          Of
	          In
	  Sent
						By
						From

	Order

		Wallet
						(xxx)


I can add plugins to my bot, that will add new pattern matchings and actions.

Bot.Plugin(function("Bitcoin") {

	var _this = this;

	var _this.getBitcoinPrice = function(at, in) {
		return price
	}
	
	var _this.Patterns: [
		{
			"Event":			"Price"
			"Type":				"Question"		
			"Pattern": 		/price|value/i
			"Params": 		[/at/, /in/]						// A param is a keyword followed by a word
			"Result":		_this.getBitcoinPrice
		}
	]

}

Now when we receive a Price question, we iterate over plugins looking for this pattern:

var pattern = <Price pattern obj>
var params;
pattern.params.forEach(function(param) {
	if (param.match(str))
		var word_following_param = ...
		params.push [param, word_following_param]
})

Bot.Plugin["Bitcoin"].call(eval(pattern.Result({params}))) //params = {"at": xx, "in": xx}