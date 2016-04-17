//RULES
//if template needs data, create helper object. 
//if multiple helper objects need same data, create global function.
//if multiple templates need same function, create global helper.
//if sharing variable


// Check for Settings file
console.log("...checking for settings file...");
if (!Meteor.settings.public.govSettings) {
    alert(" No Settings File! start server with 'NPM RuN' ");
}

abbr_State = function(name, to) {
    //console.log("Abbreviating!");
    var states = new Array(                         {'name':'Alabama', 'abbrev':'AL'},          {'name':'Alaska', 'abbrev':'AK'},
        {'name':'Arizona', 'abbrev':'AZ'},          {'name':'Arkansas', 'abbrev':'AR'},         {'name':'California', 'abbrev':'CA'},
        {'name':'Colorado', 'abbrev':'CO'},         {'name':'Connecticut', 'abbrev':'CT'},      {'name':'Delaware', 'abbrev':'DE'},
        {'name':'Florida', 'abbrev':'FL'},          {'name':'Georgia', 'abbrev':'GA'},          {'name':'Hawaii', 'abbrev':'HI'},
        {'name':'Idaho', 'abbrev':'ID'},            {'name':'Illinois', 'abbrev':'IL'},         {'name':'Indiana', 'abbrev':'IN'},
        {'name':'Iowa', 'abbrev':'IA'},             {'name':'Kansas', 'abbrev':'KS'},           {'name':'Kentucky', 'abbrev':'KY'},
        {'name':'Louisiana', 'abbrev':'LA'},        {'name':'Maine', 'abbrev':'ME'},            {'name':'Maryland', 'abbrev':'MD'},
        {'name':'Massachusetts', 'abbrev':'MA'},    {'name':'Michigan', 'abbrev':'MI'},         {'name':'Minnesota', 'abbrev':'MN'},
        {'name':'Mississippi', 'abbrev':'MS'},      {'name':'Missouri', 'abbrev':'MO'},         {'name':'Montana', 'abbrev':'MT'},
        {'name':'Nebraska', 'abbrev':'NE'},         {'name':'Nevada', 'abbrev':'NV'},           {'name':'New Hampshire', 'abbrev':'NH'},
        {'name':'New Jersey', 'abbrev':'NJ'},       {'name':'New Mexico', 'abbrev':'NM'},       {'name':'New York', 'abbrev':'NY'},
        {'name':'North Carolina', 'abbrev':'NC'},   {'name':'North Dakota', 'abbrev':'ND'},     {'name':'Ohio', 'abbrev':'OH'},
        {'name':'Oklahoma', 'abbrev':'OK'},         {'name':'Oregon', 'abbrev':'OR'},           {'name':'Pennsylvania', 'abbrev':'PA'},
        {'name':'Rhode Island', 'abbrev':'RI'},     {'name':'South Carolina', 'abbrev':'SC'},   {'name':'South Dakota', 'abbrev':'SD'},
        {'name':'Tennessee', 'abbrev':'TN'},        {'name':'Texas', 'abbrev':'TX'},            {'name':'Utah', 'abbrev':'UT'},
        {'name':'Vermont', 'abbrev':'VT'},          {'name':'Virginia', 'abbrev':'VA'},         {'name':'Washington', 'abbrev':'WA'},
        {'name':'West Virginia', 'abbrev':'WV'},    {'name':'Wisconsin', 'abbrev':'WI'},        {'name':'Wyoming', 'abbrev':'WY'},
        {'name':'District of Columbia', 'abbrev':'DC'}
        );

    var returnthis;
    $.each(states, function(index, value){
        if (to == 'name') {
            if (value.abbrev == name){
                returnthis = value.name;
                // return false;
            }
        } else if (to === 'abbrev') {
            if (value.name == name){
                returnthis = value.abbrev;
                // return false;
            }
        }
    });
    return returnthis;
};

WebFontConfig = {
    google: { families: [ 'Titillium+Web:400,700:latin' ] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();


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
getFreq = function(obj, label) {
  //takes api results object and the parameter of the body of text. 
  var wordsArr;  
  if (!label) {
      wordsArr = obj;
  } else {


      wordsArr = _.pluck(obj, label).join(" ");
  }
  
  //console.log(wordsArr);
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


    var keys = _.keys(freqObj);
    var values = _.map(keys, function(k) { return freqObj[k]; });
    // Transpose the values matrix
    
    var freqArr = _.zip(keys,values);
    
    return freqArr;
};

makeCloud = function(arr) {
  //takes array of words & numbers 
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
  //console.log(arr.length + " Words in cloud...");
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

Template.registerHelper("isEmpty", function (object) {
    return jQuery.isEmpty(object);
});
