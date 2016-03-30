console.log("--legiScan.js");


/*
params
state     State abbreviation to search on, or ALL for entire nation
bill      Bill number for an exact bill number or to limit query
query     Full text query string to run against the search engine, URL encoded
year      Year where 1=all, 2=current, 3=recent, 4=prior, >1900=exact [Default: 2]
page      Result set page number to return [Default: 1]

*/

/*
 * Used as a comparison function to sort the array of bills that come back from a legiscan query.
 * This will sort that array based on the last action date descending.
 */



function compareActionDates(documentA, documentB) {
  /* excepting the query from borking up the results ordering */
  if(documentA.name === "query") {
    return 1;
  } else if(documentB.name === "query") {
    return -1;
  }

  /* extracting dates from the legiscan result objects
   * ex: {
   *       bill_id: 847164
   *       bill_number: "HB1264"
   *       change_hash: "372c1fac92a0b989862f062d5ae81b2a"
   *       last_action: "Hearing 3/15 at 1:00 p.m."
   *       last_action_date: "2016-03-15"
   *       relevance: 95
   *       research_url: "https://legiscan.com/MD/research/HB1264/2016"
   *       state: "MD"
   *       text_url: "https://legiscan.com/MD/text/HB1264/2016"
   *       title: "Criminal Procedure - Right of Appeal - Unlawful Possession of Firearm"
   *       url: "https://legiscan.com/MD/bill/HB1264/2016"
   *   }
   */
  var last_action_dateA = new Date(documentA.value.last_action_date);
  var last_action_dateB = new Date(documentB.value.last_action_date);

  //console.log("Testing: "+ last_action_dateA +" vs " + last_action_dateB);

  /*
   *  Checking for undefined dates
   */
  if(!last_action_dateA && last_action_dateB) {
    return -1;
  }
  if(!last_action_dateB && last_action_dateA) {
    return 1;
  }

  /*
   * Actual date logic
   */
  if(last_action_dateA < last_action_dateB) {
    return 1;
  } else if(last_action_dateA > last_action_dateB) {
    return -1;
  } else {
    return 0;
  }
}

//function creates object of words and their frequencies. 
// obj = object to pluck 
// key = key name to pluck
// i.e 
getFreq = function(obj) {

  var wordsArr = _.pluck(obj, 'title').join(" ");
  //  console.log(wordsArr);
  var wordCount = wordsArr.length;

  /* Below is a regular expression that finds alphanumeric characters
     Next is a string that could easily be replaced with a reference to a form control
     Lastly, we have an array that will hold any words matching our pattern */
  var pattern = /\w+/g,
      matchedWords = wordsArr.match( pattern );

  /* The Array.prototype.reduce method assists us in producing a single value from an
     array. In this case, we're going to use it to output an object with results. */
  var freqObj = matchedWords.reduce(function ( stats, word ) {

      /* `stats` is the object that we'll be building up over time.
         `word` is each individual entry in the `matchedWords` array */
      if ( stats.hasOwnProperty( word ) ) {
          /* `stats` already has an entry for the current `word`.
             As a result, let's increment the count for that `word`. */
          stats[ word ] = stats[ word ] + 1;
      } else {
          /* `stats` does not yet have an entry for the current `word`.
             As a result, let's add a new entry, and set count to 1. */
          stats[ word ] = 1;
      }

      /* Because we are building up `stats` over numerous iterations,
         we need to return it for the next pass to modify it. */
      return stats;

    }, {} );

    /* Now that `freqObj` has our object, we can log it. */
    //console.log( freqObj );

    //return freqObj;

    var keys = _.keys(freqObj);
    var values = _.map(keys, function(k) { return freqObj[k]; });
    // Transpose the values matrix
    
    var cloudArr = _.zip(keys,values);
    
    return cloudArr;
}

makeCloud = function(arr) {
  var element = $('#wcloud')[0];

  var options = {
    list : arr,
    gridSize : Math.round(10 * $('#wcloud').width() / 1024),
    weightFactor : function (size) {
      size = size*5;
      return Math.pow(size, 1.3) * $('#wcloud').width() / 1024;
    },
    fontFamily : 'Garamond, serif',
    color : 'random-dark',
    classes : 'cloudWords',
    rotateRatio : 0.5
    //shape : 'square'
    };
  console.log(arr.length + " Words in cloud...");
  WordCloud(element, options);

};




var getList = function() {
  listDep.depend();
  return list;
};

var setList = function(l) {
  list = l;
  listDep.changed();
};



/*  */



Template.legiScanSearch.helpers({
  location: function() {
    var ipInfo = Session.get('ipInfo');
    if (ipInfo) {
      var state;
      state = ipInfo.state;
      ipInfo.region = abbr_State(state, "name");
      return ipInfo.region;
    }
  }
});


Template.legiScanSearch.events({
  'submit #legi-search': function (evt, tpl) {
    event.preventDefault();
    
    var query = tpl.find('input#query').value;

    Session.set('query', query);

    analytics.track("Legi Search", {
      query: query
    });

  }
});


Template.legiScanResults.helpers({
  results: function() {
  
  },
  query: function () {
    query = Session.get('query');
    //console.log(query);
    return query;
  },
  queryList: function() {

    var state = Session.get('ipInfo').state;

    if (Session.get('newState')) {
      state = Session.get('newState');
    }

    var params = {};
      params.query = Session.get('query');
      params.year = 2016;
      params.state = state;
  
    Session.set('query', params.query);

    var op = 'search';
    var urlParams = jQuery.param(params);

    Meteor.call('legiScan', op, urlParams, function (err, res) {
      // The method call sets the Session variable to the callback value
      if (err) { 
        return err;
      } else {
        res = res.searchresult;
        res.query = params.query;
        Session.set('results', res);
        Session.set('list', getFreq(res));
        //makeCloud(zipObj(getFreq(res)));
        //return res;
      }
    });

    queryArr = [];
    var obj = Session.get('results');
    for (var key in obj) {
      queryArr.push({
        name : key,
        value : obj[key]
      });
    }

    queryArr.sort(compareActionDates);

    //console.log(queryArr);
    return queryArr;
  }
});

Template.legiScanSearch.onRendered(function() {
  /* Semantic UI Modules */
  $('.ui.sticky')
    .sticky({
  });
})
