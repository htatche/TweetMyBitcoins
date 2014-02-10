var OAuth = require("OAuth");
var Q     = require("q");
var blockchain   = require('./blockchain.js');

// Twitter application-only authentication
var oauth;

var consumer_key         = "f6UUux737tKxq9zb94q8gQ",
    consumer_secret_key  = "PXE1LYvKjB1VoaLs5E6HZ7YDRhL5N12Hq2DA2tmg3g",

    access_token         = "2322506394-c88YFZngq96SV3wZo9OcJBjcGEaSTnTwY8Lte0j";
    secret_access_token  = "gqnQtZOVmpBMzrX8xztpRhNpSvbiqN9ZyJOzTAkf0VmFM";       

    request_token_url    = "https://api.twitter.com/oauth/request_token",
    access_token_url     = "https://api.twitter.com/oauth/access_token"; 

var streamDirectMessages = function() {
  var user_stream_url = "https://userstream.twitter.com/1.1/user.json",

      request         = oauth.get(user_stream_url,
                                  access_token,
                                  secret_access_token);  

  request.addListener("response", function (response) {

    response.setEncoding("utf8");

    response.addListener("data", function (data) {
      var json; 

      try {
        console.log("I received a bunch of data !");
        console.log(data);

        json = JSON.parse(data);
      } catch (e) { 
        return;
      }        

      if (json.hasOwnProperty("text"))
        parseDirectMessage(json);

    });

    response.addListener("end", function () {
      console.log("End of communication");
      return
    });

  });

  request.end();
};

var extractBitcoinAddress = function(str) {
  var regxp = /([13][1-9A-HJ-NP-Za-km-z]{26,33})/,
      address;    

  if (str = str.match(regxp)) {
    return str[0];
  } else {
    throw new Error("Invalid bitcoin address");
  }
}

var parseDirectMessage = function(json) {
  var str = json.text,
      address;     

  if (str.match(/.*balance.*/)) {
    address = extractBitcoinAddress(str);

    blockchain.getBalance(address)
    .then(
      function(satoshis) {
        var bitcoins = satoshis * 0.00000001;
        // The status id param is too big for a JS Number
        var status_id = json.id_str; 
        var user_id = json.user.id;
        var screen_name = json.user.screen_name;

        var msg = "@" + screen_name + " Hey mate ! This wallet has " + bitcoins.toString() + " bitcoins :-)";

        answerStatus(status_id, msg);
      },
      function(error) {   
        throw error;
      }
    ) 
  }  
}

var answerDirectMessage = function(id, user_id, msg) {
  var url = "https://api.twitter.com/1.1/direct_messages/new.json";
  var params = "?user_id=" + user_id + "&text=" + encodeURIComponent(msg);

  url = url + params;

  oauth.post(url,
             access_token,
             secret_access_token,
             function(e,data,res) {
                console.log("Error: ");
                console.log(e);

  });

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
               // console.log("Error: ");
               // console.log(e);
               console.log("Data: ");
               console.log(data);

  });

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


streamDirectMessages(); 

// answerStatus("432512603932217344", "@dtweetmybitcoin Blahbldwewe-asdasdasdaasdhb!lah !")
//parseDirectMessage("What is the balance of 1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX ?");