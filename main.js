var twitter = require("./twitter/main.js");

var bot = new twitter.Bot();

bot.authenticate();

var status = new bot.Status({text: "What is the balance of 1AM5xJLHAenvTdzRDh6rv5TUFJm84W4uvT ?"});

if (status.isQuestion()) {

	bot.ask(status.text).then(
		function(answer) {
			status.reply(answer);
			question.reply();
		},
		function(e) {
			console.error(e);
		}		
	)

}