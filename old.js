var getAccessToken = function() {
  var deferred = Q.defer();

  oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {

    if (error) {
      deferred.reject(error);
    }
    else { 
      parent.access_token = oauth_token;
      parent.secret_access_token = oauth_token_secret;

      deferred.resolve(results);
    }

  });

  return deferred.promise;
};