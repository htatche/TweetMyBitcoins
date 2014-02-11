var utilities = require('../utilities.js');

describe("Utility methods", function() {
	describe("Extract a Bitcoin address", function() {

	  it("extracts a valid Bitcoin address from a string", function() {
	  	var str = "I am a random string with this valid 1QAHVyRzkmD4j1pU5W89htZ3c6D6E7iWDs address.";
	  	var address = utilities.extractBitcoinAddress(str);

	    expect(address).toEqual("1QAHVyRzkmD4j1pU5W89htZ3c6D6E7iWDs");
	  });

	  it("throws an Invalid bitcoin address error if there is no valid address", function() {
	  	var str = "Public addresses should start with 1 or 3 5QAHVyRzkmD4j1pU5W89htZ3c6D6E7iWDs.";

	  	anon = function() {
	  		utilities.extractBitcoinAddress(str);
	  	}

	    expect(anon).toThrow("Invalid bitcoin address");
	  });

	});	  
});