//milktam:server-cache package - https://github.com/miktam/server-cache
//instantiates ApiCache obect which creates ' rest_+name+ ' upon creation, with time to live.
//ex. var cache = new ApiCache('name',ttl);


var cache = new ApiCache('rest', 120);

var apiCall2 = function (apiUrl, params, headers, callback) {
  // try...catch allows you to handle errors 
  var errorCode, errorMessage;
  try {

    var dataFromCache = cache.get(apiUrl);
    console.log("key: "+apiUrl);
    var response = {};

    if(dataFromCache) {
      console.log("Data from Cache2...");
      response = dataFromCache;
    } else {
      console.log("Data from API2...");
        if (params, headers) {
          response = HTTP.get(apiUrl, {params: params, headers: headers}).data;
        }
        else {
          response = HTTP.get(apiUrl).data;
        }
      cache.set(apiUrl, response);
    }

    // A successful API call returns no error
    // but the contents from the JSON response
    if(callback) {
      callback(null, response);
    }
    return response;
  } catch (error) {
    // If the API responded with an error message and a payload 
    if (error.response) {
      console.log(error.response);
      errorCode = error.response.data.error ? error.response.data.error.code : 1911;
      errorMessage = error.response.data.error ? error.response.data.error.message : error.response.data.message;
    // Otherwise use a generic error message
    } else {
      errorCode = 500;
      errorMessage = 'No idea what happened!';
    }
    // Create an Error object and return it via callback
    var myError = new Meteor.Error(errorCode, errorMessage);
    let msg = 'Error: [' + errorCode + '] ' + errorMessage ;
    Errors.insert({message: msg});
    if(callback) {
      callback(myError, null);
    }
    return myError;
  }
};

var apiCall = function (apiUrl, callback) {
  // try…catch allows you to handle errors 
  var errorCode, errorMessage;
  try {

    var dataFromCache = cache.get(apiUrl);
    console.log("key: "+apiUrl);
    var response = {};

    if(dataFromCache) {
      console.log("Data from Cache...");
      response = dataFromCache;
    } else {
      console.log("Data from API...");
      response = HTTP.get(apiUrl).data;
      cache.set(apiUrl, response);
    }

    // A successful API call returns no error
    // but the contents from the JSON response
    if(callback) {
      callback(null, response);
    }
    
  } catch (error) {
    // If the API responded with an error message and a payload 
    if (error.response) {

      console.log(error.response.data.error);
      errorCode = error.response.data.error.code;
      errorMessage = error.response.data.error.message;
    // Otherwise use a generic error message
    } else {
      errorCode = 500;
      errorMessage = 'No idea what happened!';
    }
    // Create an Error object and return it via callback
    var myError = new Meteor.Error(errorCode, errorMessage);
    callback(myError, null);
  }
};


Meteor.methods({
  zipCode: function(zip) {
    this.unblock();
    console.log("***calling zipCodeAPI.com method with "+zip);
    var key = Meteor.settings.public.govSettings.zipCodeAPI.key;
    var apiUrl = 'https://www.zipcodeapi.com/rest/'+ key + '/info.json/'+ zip + '/degrees';
    console.log("--URL--"+apiUrl);
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    //console.log(response);
    return response;
  },
  sunLight: function(method, params) {
    this.unblock();
    console.log ( '*** running sunLight() with "'+ method +'" param: '+ params);
    var key = Meteor.settings.public.govSettings.sunlight.apikey;
    var apiUrl = 'https://congress.api.sunlightfoundation.com/' + method + '?apikey=' + key + '&' +params;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);  
    console.log("--URL--"+apiUrl);
    // console.log(response);
    return response;
  },
  partyTime: function(method, params) {
    this.unblock();
    console.log ( '*** running partyTime() with "'+ method +'" param: '+ params);
    var key = Meteor.settings.public.govSettings.sunlight.apikey;
    //methods are "/event, /lawmakers, /venue"
    var apiUrl = 'http://politicalpartytime.org/api/v1/' + method + '?apikey=' + key + '&' +params;
    console.log("--URL--"+apiUrl);
    var response = Meteor.wrapAsync(apiCall)(apiUrl);  
    // console.log(response);
    return response;    
  },  
  legiScan: function(op, param) {
    this.unblock();
    console.log ( '*** running legiScan() with "'+ op +'" param: '+ param);
    var key = Meteor.settings.public.govSettings.legiscan.key;
    var apiUrl = 'http://api.legiscan.com/?key=' + key + '&op=' + op + '&' + param;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    console.log("--URL--"+apiUrl);
    return response;
  },
  openFEC: function(method, params) {
    this.unblock();
    console.log ( '*** running openFEC() with "'+ method +'" param: '+ params);
    var key = Meteor.settings.public.govSettings.openfec.api_key;
    var apiUrl = 'https://api.open.fec.gov/v1?api_key=' + key + '&' +params;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    console.log("--URL--"+apiUrl);
    //console.log(response);
    return response;
  },
  huffPollster: function(method, params) {
    this.unblock();
    console.log ( '*** running pollster() with method: "'+ method +'" and params: '+ params);
    var apiUrl = 'http://elections.huffingtonpost.com/pollster/api/' + method + '?' +params;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    console.log("--URL--"+apiUrl);
    //console.log(response);
    return response;
  },
  nytBills: function(memberID) {
    this.unblock();
    console.log( '*** running nytBills() with memberID:'+ memberID);
    var version = "v3";
    var type = "updated"; //or 'introduced'
    var key = Meteor.settings.public.govSettings.nytimes.key;
    var apiUrl = 'http://api.nytimes.com/svc/politics/'+ version +'/us/legislative/congress/members/' + memberID + '/bills/' + type + '.json?api-key=' + key;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    //console.log(apiUrl);
    //console.log(response);
    return response;
  },
  googleCivic: function(method, params) {
    this.unblock();
    console.log( '*** running googleCivic() with memberID:'+ method);
    var key = Meteor.settings.public.govSettings.googleCivic.key;

    var gHeaders = {
      // 'Accept-Encoding': 'gzip',
    };
    // var pParams = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    // pParams.key = key;
    // console.log(pParams);

    // var apiUrl = 'https://www.googleapis.com/civicinfo/v2/' + method;
    
    var apiUrl = 'https://www.googleapis.com/civicinfo/v2/' + method + '?' + params + '&key=' +key;
    var pParams;
    //console.log(apiUrl);
    var response = Meteor.wrapAsync(apiCall2)(apiUrl, pParams, gHeaders);
    //console.log(response);
    return response;   

  },
  getNewsTickerFeed: function(author) {
    this.unblock();
    var reutersUrl = "http://feeds.reuters.com/Reuters/PoliticsNews";
    var quotesUrl = "https://webknox-entities.p.mashape.com/entities/quotes";
    var quotesParams = {
      author: author
    };

    var quotesHeaders = {
      'X-Mashape-Key': Meteor.settings.public.govSettings.mashable.key
    };
    var response = Meteor.wrapAsync(apiCall2)(quotesUrl, quotesParams,quotesHeaders);
    //console.log("ending get news ticker feed {}", response);

    return response;
  }, 
  wikiCall: function(params){
    this.unblock();
    console.log( '*** running wiki() with params:'+ params);
    var apiUrl = 'https://en.wikipedia.org/w/api.php?' + params;
    //console.log(apiUrl);
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    //console.log(response);
    return response; 
   }

});


//https://www.googleapis.com/civicinfo/v2/
//http://politicalpartytime.org/api/v1/event/?beneficiaries__state=md&start_date__gt=2015-12-25&format=json&apikey="+Meteor.settings.public.govSettings.sunlight.apikey
//http://politicalpartytime.org/api/v1/event/?beneficiaries__state=md&start_date__gt=2015-01-01&format=json&apikey=345a8f0b36114bde89222326b8b1e1af
//console.log("http://api.nytimes.com/svc/politics/v3/us/legislative/congress/114/senate/members/current.json?api-key="+ Meteor.settings.public.govSettings.nytimes.key);

//"http://api.nytimes.com/svc/politics/v3/us/legislative/congress/114/nominees/state/md.json?api-key=557b2bfde68793e7d49ca5a2daf77602:14:28561524"
//"http://api.nytimes.com/svc/politics/v3/us/legislative/congress/states/members/party.json?api-key=557b2bfde68793e7d49ca5a2daf77602:14:28561524"

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