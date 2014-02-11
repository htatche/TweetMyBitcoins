exports.extractBitcoinAddress = function(str) {
  var regxp = /([13][1-9A-HJ-NP-Za-km-z]{26,33})/,
      address;    

  if (str = str.match(regxp)) {
    return str[0];
  } else {
    throw new Error("Invalid bitcoin address");
  }
}

// var answerDirectMessage = function(id, user_id, msg) {
//   var url = "https://api.twitter.com/1.1/direct_messages/new.json";
//   var params = "?user_id=" + user_id + "&text=" + encodeURIComponent(msg);

//   url = url + params;

//   oauth.post(url,
//              access_token,
//              secret_access_token,
//              function(e,data,res) {
//                 console.log("Error: ");
//                 console.log(e);

//   });

// }