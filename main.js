var twitter = require("./twitter/main.js");

var bot = new twitter.Bot();

bot.authenticate();

var newStatus = function(body) {
	var status = new bot.Status({body: body});

	if (status.isQuestion())
			bot
			.ask(status.text)
			.then(
				function(answer) { status.reply(answer); },
				function(e) 		 { console.error(e); }
			)
}

bot.on("new_status", function(data) { newStatus(data); })

bot.listen();