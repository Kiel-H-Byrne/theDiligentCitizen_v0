(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/server-methods.js                                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var apiCall = function (apiUrl, callback) {                            // 1
  // try…catch allows you to handle errors                             //
  try {                                                                // 3
    var response = HTTP.get(apiUrl).data;                              // 4
    // A successful API call returns no error                          //
    // but the contents from the JSON response                         //
    callback(null, response);                                          // 7
  } catch (error) {                                                    //
    // If the API responded with an error message and a payload        //
    if (error.response) {                                              // 10
      var errorCode = error.response.data.code;                        // 11
      var errorMessage = error.response.data.message;                  // 12
      // Otherwise use a generic error message                         //
    } else {                                                           //
        var errorCode = 500;                                           // 15
        var errorMessage = 'No idea what happened!';                   // 16
      }                                                                //
    // Create an Error object and return it via callback               //
    var myError = new Meteor.Error(errorCode, errorMessage);           // 19
    callback(myError, null);                                           // 20
  }                                                                    //
};                                                                     //
                                                                       //
Meteor.methods({                                                       // 25
  sunLight: function (method, params) {                                // 26
    this.unblock();                                                    // 27
    console.log('*** running Method.sunLight with ' + method + ' param: ' + params);
    var key = '345a8f0b36114bde89222326b8b1e1af';                      // 29
    //var key = Meteor.settings.public.govSettings.sunlight.apikey;    //
    var apiUrl = 'https://congress.api.sunlightfoundation.com/' + method + '?apikey=' + key + '&' + params;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);                  // 32
    console.log(apiUrl);                                               // 33
    //console.log(response);                                           //
    return response;                                                   // 35
  },                                                                   //
  legiScan: function (op, param) {                                     // 37
    this.unblock();                                                    // 38
    console.log('*** running Method.legiScan with ' + op + ' param: ' + param);
    var key = '5e92d12f203ca365fbdcdad88418e626';                      // 40
    //var key = Meteor.settings.public.govSettings.legiscan.key;       //
    console.log(key);                                                  // 42
    var apiUrl = 'http://api.legiscan.com/?key=' + key + '&op=' + op + '&' + param;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);                  // 44
    console.log(apiUrl);                                               // 45
    return response;                                                   // 46
  },                                                                   //
  openFEC: function (method, params) {                                 // 48
    this.unblock();                                                    // 49
    console.log('*** running Method.openFEC with ' + method + ' param: ' + params);
    var key = 'VlzCNbEgjbxSxKTDHgET4DWnZdVuVaOB3SkI2C3I';              // 51
    //var key = Meteor.settings.public.govSettings.openfec.api_key;    //
    var apiUrl = 'https://api.open.fec.gov/v1?api_key=' + key + '&' + params;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);                  // 54
    console.log(apiUrl);                                               // 55
    //console.log(response);                                           //
    return response;                                                   // 57
  }                                                                    //
});                                                                    //
                                                                       //
/* Methods                                                             //
/legislators                                                           //
/legislators/locate                                                    //
/districts/locate                                                      //
/committees                                                            //
/bills                                                                 //
/bills/search                                                          //
/amendments                                                            //
/nominations                                                           //
/votes                                                                 //
/floor_updates                                                         //
/hearings                                                              //
/upcoming_bills                                                        //
/congressional_documents/search                                        //
/documents/search                                                      //
                                                                       //
*/                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=server-methods.js.map
