// TweetmyBTC
// Usage: localhost/balance/?address=<bitcoinaddress>

var http = require("http");
var api  = require('./api.js');

var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});

  params = require('url').parse(request.url, true);

  console.log ("pathname " + params.pathname)
  console.log ("GET " + params.search)

  switch(params.pathname) {
    case "/balance/":
      api.balance(params.query)
      .then(function(answer) {
        response.write(answer);
        response.end();  
      })    
  };

});

server.listen(8080);
console.log("Server is listening");