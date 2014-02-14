var twitter = require("./twitter/main.js");

var bot = new twitter.Bot();

bot.authenticate();

// var status = new bot.Status();

// debugger

// var Auth = require("./auth.js");

// var auth = new Auth();

// var str = Math.random().toString(36).substring(10);
// var url = "https://api.twitter.com/1.1/statuses/update.json";
// var params = {"status": str};

// var status = new bot.Status({text: str});

// status.send(url, params).then(
//   function(data) {
//     console.log(data);
//   },
//   function(e) {
//     console.log(e);
//   }    
// );


// var bot = new Bot()
// bot.authenticate()
// var status = new bot.Status()
// status.