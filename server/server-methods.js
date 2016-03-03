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
  sunLight: function(method, params) {
    this.unblock();
    console.log ( '*** running sunLight() with "'+ method +'" param: '+ params);
    var key = Meteor.settings.public.govSettings.sunlight.apikey;
    var apiUrl = 'https://congress.api.sunlightfoundation.com/' + method + '?apikey=' + key + '&' +params;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);  
    //console.log(apiUrl);
    //console.log(response);
    return response;
  },  
  legiScan: function(op, param) {
    this.unblock();
    console.log ( '*** running legiScan() with "'+ op +'" param: '+ param);
    var key = Meteor.settings.public.govSettings.legiscan.key;
    var apiUrl = 'http://api.legiscan.com/?key=' + key + '&op=' + op + '&' + param;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    //console.log(apiUrl);
    return response;
  },
  openFEC: function(method, params) {
    this.unblock();
    console.log ( '*** running openFEC() with "'+ method +'" param: '+ params);
    var key = Meteor.settings.public.govSettings.openfec.api_key;
    var apiUrl = 'https://api.open.fec.gov/v1?api_key=' + key + '&' +params;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    //console.log(apiUrl);
    //console.log(response);
    return response;
  },
  huffPollster: function(method, params) {
    this.unblock();
    console.log ( '*** running pollster() with method: "'+ method +'" and params: '+ params);
    var apiUrl = 'http://elections.huffingtonpost.com/pollster/api/' + method + '?' +params;
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
