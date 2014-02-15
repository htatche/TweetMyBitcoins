var twitter = require("./twitter/main.js");

var bot = new twitter.Bot();

bot.authenticate();



// var status = new bot.Status({params});

// if (status.isQuestion()) {
if (true) {	

	// bot.ask(status.text).then(function(answer) {
	// 	bot.reply(status_id, beautified_message)
	// })

	try {
	  var question = new bot.Question("What is the balance of 1AM5xJLHAenvTdzRDh6rv5TUFJm84W4uvT");
	} catch (e) {
	  console.error(e);
	  return;
	}

	question.answer().then(
		function(answer) {
			console.log(answer);
			// bot.reply(status_id, beautified_message)
		}
	);

}

