var OAuth = require("OAuth");

var Auth = function() {
	var consumer_key         = "48APF9VXEOVWqCrMT8Uxw",
	    consumer_secret_key  = "USHQTBSGLqHCcSiRSTyPjNY03Ihis35VrD0trXlLHE",  

	    request_token_url    = "https://api.twitter.com/oauth/request_token",
	    access_token_url     = "https://api.twitter.com/oauth/access_token";

	this.access_token         = "2322506394-13iittX2Cy7kH8R6wyM12v1DmbDcVg1d4gM7iqn";
	this.secret_access_token  = "aOdMwNhMs2n0J2GxOipvMg1af85CvflfG3IgOIxgsqdp8";      

	this.create = function() {
		this.oauth = new OAuth.OAuth(
		  request_token_url,
		  access_token_url,
		  consumer_key,
		  consumer_secret_key,
		  "1.0A",
		  null,
		  "HMAC-SHA1"
		); 
	}

	this.create();
}

module.exports = Auth;