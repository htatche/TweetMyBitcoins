var OAuth = require("OAuth"),
    Q     = require("q"),
    utilities = require('./utilities.js');    
    blockchain = require('./blockchain.js');

var oauth;

var consumer_key         = "f6UUux737tKxq9zb94q8gQ",
    consumer_secret_key  = "PXE1LYvKjB1VoaLs5E6HZ7YDRhL5N12Hq2DA2tmg3g",

    access_token         = "2322506394-c88YFZngq96SV3wZo9OcJBjcGEaSTnTwY8Lte0j";
    secret_access_token  = "gqnQtZOVmpBMzrX8xztpRhNpSvbiqN9ZyJOzTAkf0VmFM";       

    request_token_url    = "https://api.twitter.com/oauth/request_token",
    access_token_url     = "https://api.twitter.com/oauth/access_token"; 

var streaming = function() {
  var user_stream_url = "https://userstream.twitter.com/1.1/user.json";

  var req = oauth.get(user_stream_url,
                      access_token,
                      secret_access_token);  

  req.addListener("response", function (res) {

    res.setEncoding("utf8");

    res.addListener("data", function (data) {
      console.log("I received a bunch of data !");
      console.log(data);      

      try {
        var json = JSON.parse(data);
      } catch (e) { return; }        

      if (json.hasOwnProperty("text"))
        parseStatus(json);

    });

    res.addListener("end", function () {
      throw new Error("End of streaming with Twitter");
    });

  }).end();
};

var parseStatus = function(json) {

  if (json.text.match(/.*balance.*/)) {
    
    generateReplyToBalance(json).then(
      function(str) {
        answerStatus(json.id_str, str);
      },
      function(e) {
        throw e; 
      }      
    )
  }  

}

var generateReplyToBalance = function(json) {
  var deferred = Q.defer();
  var address = utilities.extractBitcoinAddress(json.text);

  blockchain.getBalance(address)
  .then(
    function(satoshis) {
      var bitcoins = satoshis * 0.00000001;

      var msg = "@" + json.user.screen_name +
                " Hey mate ! This wallet has " +
                bitcoins.toString() + " bitcoins :-)";

      deferred.resolve(msg);
    },
    function(e) {   
      deferred.reject(e);
    }
  ) 

  return deferred.promise;
}

var answerStatus = function(status_id, msg) {
  var url = "https://api.twitter.com/1.1/statuses/update.json";
  var params = {"in_reply_to_status_id": status_id, "status": msg};

  oauth.post(url,
             access_token,
             secret_access_token,
             params,
             function(e,data,res) { 
                console.log("Message posted !!");
             }

  );

}

oauth = new OAuth.OAuth(
  request_token_url,
  access_token_url,
  consumer_key,
  consumer_secret_key,
  "1.0A",
  null,
  "HMAC-SHA1"
);


streaming(); 

// answerStatus("432512603932217344", "@dtweetmybitcoin Blahbldwewe-asdasdasdaasdhb!lah !")
// parseStatus("What is the balance of 1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX ?");