(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/legiScan.js                                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
console.log("--legiScan.js");                                          // 1
                                                                       //
/*                                                                     //
params                                                                 //
state     State abbreviation to search on, or ALL for entire nation    //
bill      Bill number for an exact bill number or to limit query       //
query     Full text query string to run against the search engine, URL encoded
year      Year where 1=all, 2=current, 3=recent, 4=prior, >1900=exact [Default: 2]
page      Result set page number to return [Default: 1]                //
                                                                       //
*/                                                                     //
                                                                       //
/*                                                                     //
 * Used as a comparison function to sort the array of bills that come back from a legiscan query.
 * This will sort that array based on the last action date descending.
 */                                                                    //
                                                                       //
function compareActionDates(documentA, documentB) {                    // 21
  /* excepting the query from borking up the results ordering */       //
  if (documentA.name === "query") {                                    // 23
    return 1;                                                          // 24
  } else if (documentB.name === "query") {                             //
    return -1;                                                         // 26
  }                                                                    //
                                                                       //
  /* extracting dates from the legiscan result objects                 //
   * ex: {                                                             //
   *       bill_id: 847164                                             //
   *       bill_number: "HB1264"                                       //
   *       change_hash: "372c1fac92a0b989862f062d5ae81b2a"             //
   *       last_action: "Hearing 3/15 at 1:00 p.m."                    //
   *       last_action_date: "2016-03-15"                              //
   *       relevance: 95                                               //
   *       research_url: "https://legiscan.com/MD/research/HB1264/2016"
   *       state: "MD"                                                 //
   *       text_url: "https://legiscan.com/MD/text/HB1264/2016"        //
   *       title: "Criminal Procedure - Right of Appeal - Unlawful Possession of Firearm"
   *       url: "https://legiscan.com/MD/bill/HB1264/2016"             //
   *   }                                                               //
   */                                                                  //
  var last_action_dateA = new Date(documentA.value.last_action_date);  // 44
  var last_action_dateB = new Date(documentB.value.last_action_date);  // 45
                                                                       //
  //console.log("Testing: "+ last_action_dateA +" vs " + last_action_dateB);
                                                                       //
  /*                                                                   //
   *  Checking for undefined dates                                     //
   */                                                                  //
  if (!last_action_dateA && last_action_dateB) {                       // 52
    return -1;                                                         // 53
  }                                                                    //
  if (!last_action_dateB && last_action_dateA) {                       // 55
    return 1;                                                          // 56
  }                                                                    //
                                                                       //
  /*                                                                   //
   * Actual date logic                                                 //
   */                                                                  //
  if (last_action_dateA < last_action_dateB) {                         // 62
    return 1;                                                          // 63
  } else if (last_action_dateA > last_action_dateB) {                  //
    return -1;                                                         // 65
  } else {                                                             //
    return 0;                                                          // 67
  }                                                                    //
}                                                                      //
                                                                       //
//function creates object of words and their frequencies.              //
// obj = object to pluck                                               //
// key = key name to pluck                                             //
// i.e                                                                 //
function getFreq(obj) {                                                // 75
                                                                       //
  var wordsArr = _.pluck(obj, 'title').join(" ");                      // 77
  //  console.log(wordsArr);                                           //
  var wordCount = wordsArr.length;                                     // 79
                                                                       //
  /* Below is a regular expression that finds alphanumeric characters  //
     Next is a string that could easily be replaced with a reference to a form control
     Lastly, we have an array that will hold any words matching our pattern */
  var pattern = /\w+/g,                                                // 84
      matchedWords = wordsArr.match(pattern);                          //
                                                                       //
  /* The Array.prototype.reduce method assists us in producing a single value from an
     array. In this case, we're going to use it to output an object with results. */
  var freqObj = matchedWords.reduce(function (stats, word) {           // 89
                                                                       //
    /* `stats` is the object that we'll be building up over time.      //
       `word` is each individual entry in the `matchedWords` array */  //
    if (stats.hasOwnProperty(word)) {                                  // 93
      /* `stats` already has an entry for the current `word`.          //
         As a result, let's increment the count for that `word`. */    //
      stats[word] = stats[word] + 1;                                   // 96
    } else {                                                           //
      /* `stats` does not yet have an entry for the current `word`.    //
         As a result, let's add a new entry, and set count to 1. */    //
      stats[word] = 1;                                                 // 100
    }                                                                  //
                                                                       //
    /* Because we are building up `stats` over numerous iterations,    //
       we need to return it for the next pass to modify it. */         //
    return stats;                                                      // 105
  }, {});                                                              //
                                                                       //
  /* Now that `freqObj` has our object, we can log it. */              //
  //console.log( freqObj );                                            //
                                                                       //
  //return freqObj;                                                    //
                                                                       //
  var keys = _.keys(freqObj);                                          // 114
  var values = _.map(keys, function (k) {                              // 115
    return freqObj[k];                                                 // 115
  });                                                                  //
  // Transpose the values matrix                                       //
                                                                       //
  var cloudArr = _.zip(keys, values);                                  // 118
                                                                       //
  return cloudArr;                                                     // 120
};                                                                     //
                                                                       //
makeCloud = function (arr) {                                           // 123
  var element = $('#wcloud')[0];                                       // 124
                                                                       //
  var options = {                                                      // 126
    list: arr,                                                         // 127
    gridSize: Math.round(10 * $('#wcloud').width() / 1024),            // 128
    weightFactor: function (size) {                                    // 129
      size = size * 5;                                                 // 130
      return Math.pow(size, 1.3) * $('#wcloud').width() / 1024;        // 131
    },                                                                 //
    fontFamily: 'Garamond, serif',                                     // 133
    color: 'random-dark',                                              // 134
    classes: 'cloudWords',                                             // 135
    rotateRatio: 0.5                                                   // 136
    //shape : 'square'                                                 //
  };                                                                   //
  console.log(arr);                                                    // 139
  WordCloud(element, options);                                         // 140
};                                                                     //
                                                                       //
var getList = function () {                                            // 147
  listDep.depend();                                                    // 148
  return list;                                                         // 149
};                                                                     //
                                                                       //
var setList = function (l) {                                           // 152
  list = l;                                                            // 153
  listDep.changed();                                                   // 154
};                                                                     //
                                                                       //
/*  */                                                                 //
                                                                       //
Template.legiScanSearch.helpers({                                      // 163
  location: function () {                                              // 164
    var ipInfo = Session.get('ipInfo');                                // 165
    if (ipInfo) {                                                      // 166
      var state;                                                       // 167
      state = ipInfo.state;                                            // 168
      ipInfo.region = abbr_State(state, "name");                       // 169
      return ipInfo.region;                                            // 170
    }                                                                  //
  }                                                                    //
});                                                                    //
                                                                       //
Template.legiScanSearch.events({                                       // 176
  'submit #legi-search': function (evt, tpl) {                         // 177
    event.preventDefault();                                            // 178
                                                                       //
    var query = tpl.find('input#query').value;                         // 180
                                                                       //
    Session.set('query', query);                                       // 182
                                                                       //
    /*                                                                 //
        var state = Session.get('ipInfo').state;                       //
                                                                       //
        if (Session.get('newState')) {                                 //
          state = Session.get('newState');                             //
        }                                                              //
                                                                       //
        var params = {};                                               //
          params.query = tpl.find('input#query').value;                //
          params.year = 2016;                                          //
          params.state = state;                                        //
                                                                       //
        Session.set('query', params.query);                            //
                                                                       //
        var op = 'search';                                             //
        var urlParams = jQuery.param(params);                          //
                                                                       //
        Meteor.call('legiScan', op, urlParams, function (err, res) {   //
          // The method call sets the Session variable to the callback value
          if (err) {                                                   //
            Session.set('results', {error: err});                      //
          } else {                                                     //
            res = res.searchresult;                                    //
            res.query = params.query;                                  //
            Session.set('results', res);                               //
            Session.set('list', getFreq(res));                         //
            //makeCloud(zipObj(getFreq(res)));                         //
            return res;                                                //
          }                                                            //
        });                                                            //
    */                                                                 //
    analytics.track("Legi Search", {                                   // 215
      query: query                                                     // 216
    });                                                                //
  }                                                                    //
});                                                                    //
                                                                       //
Template.legiScanResults.helpers({                                     // 223
  results: function () {},                                             // 224
  query: function () {                                                 // 227
    query = Session.get('query');                                      // 228
    //console.log(query);                                              //
    return query;                                                      // 230
  },                                                                   //
  queryList: function () {                                             // 232
                                                                       //
    var state = Session.get('ipInfo').state;                           // 234
                                                                       //
    if (Session.get('newState')) {                                     // 236
      state = Session.get('newState');                                 // 237
    }                                                                  //
                                                                       //
    var params = {};                                                   // 240
    params.query = Session.get('query');                               // 241
    params.year = 2016;                                                // 242
    params.state = state;                                              // 243
                                                                       //
    Session.set('query', params.query);                                // 245
                                                                       //
    var op = 'search';                                                 // 247
    var urlParams = jQuery.param(params);                              // 248
                                                                       //
    Meteor.call('legiScan', op, urlParams, function (err, res) {       // 250
      // The method call sets the Session variable to the callback value
      if (err) {                                                       // 252
        return err;                                                    // 253
      } else {                                                         //
        res = res.searchresult;                                        // 255
        res.query = params.query;                                      // 256
        Session.set('results', res);                                   // 257
        Session.set('list', getFreq(res));                             // 258
        //makeCloud(zipObj(getFreq(res)));                             //
        //return res;                                                  //
      }                                                                //
    });                                                                //
                                                                       //
    queryArr = [];                                                     // 264
    var obj = Session.get('results');                                  // 265
    for (var key in babelHelpers.sanitizeForInObject(obj)) {           // 266
      queryArr.push({                                                  // 267
        name: key,                                                     // 268
        value: obj[key]                                                // 269
      });                                                              //
    }                                                                  //
                                                                       //
    queryArr.sort(compareActionDates);                                 // 273
                                                                       //
    //console.log(queryArr);                                           //
    return queryArr;                                                   // 276
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
