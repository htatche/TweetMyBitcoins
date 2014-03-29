/*jslint node: true */

var twitter = require("./twitter/main.js");

var bot = new twitter.Bot();

bot
    .authenticate()
    .listen()
    .on("question", function (json) { 
      var   question = new bot.Question({"body": json});

      question
              .answer()
              .then(
                function (answer) { question.reply(answer); },
                function (e)      { console.error(e);     }
              )
    })

// We create a new pattern
pattern = bot.newPattern(/pattern/, function() {
  name: "wallet balance",
  answer: function() {},
  action: function() {// we could even create a new pattern from here}
  parent: function() {return bot.Library["Bitcoin"]]}
})

bot.Library.push(pattern)

/* There are some built-in events */

["message", "data", "question", "order", "agression", "random"]

// Built-in event "message"
bot.on("message", function (message) {
  bot.Library.forEach(function(pattern) {
    if (message.match(pattern))

  })
})

// Modify built-in pattern
bot.Library["Question"]["regxp"] = /Why/ 

pattern = bot.newPattern(/call/i, function() {
  name: "Call",
  reply:  function() {return "I am calling"},
  action: function() {phoneLibrary.call(number)}
})

// Library of patterns inheritates from Array
bot.Library.prototype = new Array()
bot.Library.prototype.constructor = bot.Library

questions_lib = new bot.Library()

bot.on("question", function (status) {
  questions_lib.forEach(function(pattern) {
    if (message.match(pattern))
      message.pattern.reply()
  })
})

pattern = bot.newPattern(/balance/i, function() {
  name:    "wallet balance",
  library: questions_lib,
  // we can add default actions
  reply:   function() {return "I am calling"},
  action:  function(status) {phoneLibrary.call(number)}
})

// We can later rewrite the action of a pattern
bot.on("wallet balance", function (message) {
  return something
})

// There is a tree for patterns matching

Question lib
  |- Bitcoin lib (plugin?)
     |- Balance
     |- Price market
     |- Transaction value     
     
Question lib
  |- Bitcoin lib (plugin?)
     |- Balance
     |- Price market
     |- Transaction value     