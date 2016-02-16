console.log("--wordcloud.js");

//WordCloud(elements, options);
//i.e. document.getElementById('my_canvas') or $('#my_canvas')[0] in jQuery.
//https://github.com/timdream/wordcloud2.js/blob/master/API.md

Template.wordCloud.onRendered( function() {

var getList = Session.get('list');

function zipObj(obj) {
  var keys = _.keys(obj);
  var values = _.map(keys, function(k) { return obj[k]; });
  // Transpose the values matrix
  return _.zip(keys,values);
  
};

console.log(zipObj(getList));
//console.log(getList);

var list = [
	['foo', 22],
	['bar', 46],
	['buzz', 58],
	['bang', 32]
];

var element = $('#wcloud')[0];
var options = {
  list : list,
  color : 'random-dark',
  classes : 'cloudWords',
  shuffle : true
  };
WordCloud(element, options);

});

// where list is an array that look like this: [['foo', 12], ['bar', 6]].



wordsObj =  function(obj) {
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
  var counts = matchedWords.reduce(function ( stats, word ) {

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

    /* Now that `counts` has our object, we can log it. */
    //console.log( counts );
    return counts;

}










/* 
get legiScan results;
make array of all headlines/descriptions
make array of frequency of words
join arrays to make "list" array
*/
