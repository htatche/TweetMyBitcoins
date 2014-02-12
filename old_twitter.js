var OAuth = require("OAuth"),
    Q     = require("q"),
    utilities    = require('./utilities.js');    
    blockchain   = require('./blockchain.js');
    twitter_auth = require('./twitter_auth.js');   

var Status = function(json) {
  var _this = this;

  _this.text = json.text;
  _this.user_id = json.user_id;
  _this.reply_to_id = json.in_reply_to;

  _this.isQuestion = function() {
    // Determine if it's a question
    // regxp with What/How 
    return true;
  }

  _this.send = function() {

  }

  return _this;
}    

var Question = function(status) {
  var _this = this;

  this.setType: function() {
    if (status.text.match(/.*balance.*/))
      _this.type = "balance";
      return;

    if (status.text.match(/.*price.*/))
      _this.type = "price";
      return;      

    throw new Error("No valid question");
  }

  _this.answer: function() {
    var question_type = _this.type;

    return new Answer(status.id, _this.type);
  }

  _this.reply: function() {
    _this.answer().send();
  }

  this.setType();

  return _this;
}

exports.parseData = function(json) { 

  var status = new Status(json);  

  if (status.isQuestion())
    var question = new Question(json).answer();
    return;

  if (status.isOrder())
    var order = new Order(json).answer();
    return;    

  throw new Error("No Enquiry");
};  

_exports.stream = function(url) {
  var req = oauth.get(url, access_token, secret_access_token);  

  req.addListener("response", function (res) {

    res.setEncoding("utf8");

    res.addListener("data", function (data) {
      console.log(data);      

      try {
        var json = JSON.parse(data);
      } catch (e) { return; }        

      if (json.hasOwnProperty("text"))
        parseData(json);

    });

    res.addListener("end", function () {
      throw new Error("End of streaming with Twitter");
    });

  }).end();

};

// var oauth = twitter_auth.createOauth();    
// stream("https://userstream.twitter.com/1.1/user.json"); 


// var parseStatus = function(json) {

//   if (json.text.match(/.*balance.*/)) {
    
//     generateReplyToBalance(json).then(
//       function(str) {
//         answerStatus(json.id_str, str);
//       },
//       function(e) {
//         throw e; 
//       }      
//     )
//   }  

// }

// var generateReplyToBalance = function(json) {
//   var deferred = Q.defer();
//   var address = utilities.extractBitcoinAddress(json.text);

//   blockchain.getBalance(address)
//   .then(
//     function(satoshis) {
//       var bitcoins = satoshis * 0.00000001;

//       var msg = "@" + json.user.screen_name +
//                 " Hey mate ! This wallet has " +
//                 bitcoins.toString() + " bitcoins :-)";

//       deferred.resolve(msg);
//     },
//     function(e) {   
//       deferred.reject(e);
//     }
//   ) 

//   return deferred.promise;
// }

// var answerStatus = function(status_id, msg) {
//   var url = "https://api.twitter.com/1.1/statuses/update.json";
//   var params = {"in_reply_to_status_id": status_id, "status": msg};

//   oauth.post(url,
//              access_token,
//              secret_access_token,
//              params,
//              function(e,data,res) { 
//                 console.log("Message posted !!");
//              }

//   );

// }





// answerStatus("432512603932217344", "@dtweetmybitcoin Blahbldwewe-asdasdasdaasdhb!lah !")
// parseStatus("What is the balance of 1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX ?");