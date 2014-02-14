var Auth  =  require("../auth.js");
var bot   =  require("../bot");
var mocks =  require("./mocks.js");

var auth = new Auth();

describe("Bot", function() {

	describe("Status()", function() {
    describe("When I create a new instance", function() {

  	  it("can take a text as an argument", function() {
        var str = "Hi Twitter!";

        obj = new bot.Status({text: str});

        expect(obj.text).toEqual(str);  
  	  });

  	  it("can take json as a body", function() {
        var json = mocks.status;

        obj = new bot.Status({body: json});

        expect(obj.body).toEqual(json);
  	  });	  

  	  it("can also have no arguments", function() {
        obj = new bot.Status();

        expect(typeof obj).toBe("object");   
  	  });	  	  

      it("throws an error if both arguments are given", function() {
        f = function() {
          new bot.Status({text: "", body: {}});
        }

        expect(f).toThrow("Arguments list length wrong");      
      });    

      it("throws an error if text is not a string", function() {
        f = function() {
          new bot.Status({text: 1});
        }

        expect(f).toThrow("Text must be a String");      
      });  

      it("throws an error if body is not an object", function() {
        f = function() {
          new bot.Status({body: ""});
        }

        expect(f).toThrow("Body must be an Object");      
      });            	  	  

    }); 
	});	 

  describe("A Status() object", function() {

    it("can be sent to the home streamline", function() {
      var str = Math.random().toString(36).substring(10);
      var url = "https://api.twitter.com/1.1/statuses/update.json";
      var params = {"status": str};

      obj = new bot.Status({text: str});

      runs(function() {
        flag = false;
        error = null;

        obj.send(auth.oauth, url, params).then(
          function(data) {
            flag = true;
          }  
        )

      });

      waitsFor(function() {
        return flag;
      }, "The post request was not succesful", 5000);      

      // expect(obj.send(auth)).toBe(true);      
    });      

    // it("can recognize a question", function() {
    //   var str = "What is the current bitcoin price?";

    //   obj = new bot.Status({text: str});

    //   expect(obj.isQuestion()).toBe(true);
    // });                
    
    // it("can generate a question", function() {
    // });  

  });

});