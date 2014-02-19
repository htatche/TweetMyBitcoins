/*jslint node: true */

var twitter = require("./twitter/main.js");

var bot = new twitter.Bot();

bot
    .authenticate()
    .listen()
    .on("question", function (json) { 
      var   question = new bot.Question({"body": json});
      debugger
      question
              .answer()
              .then(
                function (answer) { question.reply(answer); },
                function (e)      { console.error(e);     }
              )
    });