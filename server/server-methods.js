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
  geoJsonForIp: function (ip) {
    this.unblock();
    console.log('*** running Method.geoJsonForIp for', ip); 
    var apiUrl = 'https://freegeoip.net/json/' + ip;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    return response;
  }, 
  legiScan: function(op, param) {
    this.unblock();
    console.log ( '*** running Method.legiScan with '+ op +' param: '+ param);
    var key = '5e92d12f203ca365fbdcdad88418e626';
    var apiUrl = 'http://api.legiscan.com/?key=' + key + '&op=' + op + '&' + param;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    console.log(apiUrl);
    return response;
  },
  sunLight: function(method, params) {
    this.unblock();
    console.log ( '*** running Method.sunLight with '+ method +' param: '+ params);  
    var key = '345a8f0b36114bde89222326b8b1e1af';
    var apiUrl = 'https://congress.api.sunlightfoundation.com/' + method + '?apikey=' + key + '&' +params;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);  
    console.log(apiUrl);
    //console.log(response);
    return response;
  }
});

/* Methods 
/legislators
/legislators/locate 
/districts/locate 
/committees 
/bills  
/bills/search
/amendments 
/nominations
/votes  
/floor_updates
/hearings 
/upcoming_bills
/congressional_documents/search
/documents/search

*/
