var bot  = require("../bot");
var mocks = require("./mocks.js");

describe("Bot", function() {

	describe("Status()", function() {

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

    it("can recognize a question", function() {
      var str = "What is the current bitcoin price?";

      obj = new bot.Status({text: str});

      expect(obj.isQuestion()).toBe(true);
    });                   

	});	 

});