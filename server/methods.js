
var apiCall = function (apiUrl, callback) {
  // try…catch allows you to handle errors 
  try {
    var response = HTTP.get(apiUrl).data;
    // A successful API call returns no error 
    // but the contents from the JSON response
    callback(null, response);
  } catch (error) {
    // If the API responded with an error message and a payload 
    if (error.response) {
      var errorCode = error.response.data.code;
      var errorMessage = error.response.data.message;
    // Otherwise use a generic error message
    } else {
      var errorCode = 500;
      var errorMessage = 'No idea what happened!';
    }
    // Create an Error object and return it via callback
    var myError = new Meteor.Error(errorCode, errorMessage);
    callback(myError, null);
  }
};

Meteor.methods({
	'geoJsonForIp': function (ip) {
		this.unblock();
		console.log('*** running Method.geoJsonForIp for', ip); 
		var apiUrl = 'https://freegeoip.net/json/' + ip;
		var response = Meteor.wrapAsync(apiCall)(apiUrl);
		return response;
	}, 
	'legiScan': function(op, param) {
		this.unblock();
		console.log ( 'running Method.legiScan for', op, param);
		var apiUrl = 'http://api.legiscan.com/?key=5e92d12f203ca365fbdcdad88418e626&op='+ op + '&' + param;
		var response = Meteor.wrapAsync(apiCall)(apiUrl);
		console.log(apiUrl);
		return response;
	}
});

