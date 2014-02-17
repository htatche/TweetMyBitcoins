// _exports.stream = function(url) {
//   var req = oauth.get(url, access_token, secret_access_token);  

//   req.addListener("response", function (res) {

//     res.setEncoding("utf8");

//     res.addListener("data", function (data) {
//       console.log(data);      

//       try {
//         var json = JSON.parse(data);
//       } catch (e) { return; }        

//       if (json.hasOwnProperty("text"))
//         parseData(json);

//     });

//     res.addListener("end", function () {
//       throw new Error("End of streaming with Twitter");
//     });

//   }).end();