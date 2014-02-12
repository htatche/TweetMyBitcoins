var OAuth = require("OAuth");

var consumer_key         = "f6UUux737tKxq9zb94q8gQ",
    consumer_secret_key  = "PXE1LYvKjB1VoaLs5E6HZ7YDRhL5N12Hq2DA2tmg3g",

    access_token         = "2322506394-c88YFZngq96SV3wZo9OcJBjcGEaSTnTwY8Lte0j",
    secret_access_token  = "gqnQtZOVmpBMzrX8xztpRhNpSvbiqN9ZyJOzTAkf0VmFM",       

    request_token_url    = "https://api.twitter.com/oauth/request_token",
    access_token_url     = "https://api.twitter.com/oauth/access_token"; 

_exports.createOauth = function() {
	new OAuth.OAuth(
	  request_token_url,
	  access_token_url,
	  consumer_key,
	  consumer_secret_key,
	  "1.0A",
	  null,
	  "HMAC-SHA1"
	); 
}
