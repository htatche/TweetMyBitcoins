var twitter = require("./twitter/main.js");

var bot = new twitter.Bot();

bot.authenticate();

str = Math.random().toString(36).substring(10);
str2 = Math.random().toString(36).substring(15);
str3 = Math.random().toString(36).substring(15);

bot.say(str).say(str2).say(str3);