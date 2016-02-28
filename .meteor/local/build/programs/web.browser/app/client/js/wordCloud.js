(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/wordCloud.js                                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
console.log("--wordcloud.js");                                         // 1
                                                                       //
/* Utilizing WordCloud2.js                                             //
* API DOCS: https://github.com/timdream/wordcloud2.js/blob/master/API.md
*                                                                      //
*                                                                      //
*                                                                      //
*   WordCloud(elements, options);                                      //
*   i.e. document.getElementById('my_canvas') or $('#my_canvas')[0] in jQuery.
*                                                                      //
*    var list = [                                                      //
*      ['foo', 22],                                                    //
*      ['bar', 76],                                                    //
*      ['buzz', 58],                                                   //
*      ['bang', 42]                                                    //
*    ]                                                                 //
*/                                                                     //
                                                                       //
Template.wordCloud.helpers({                                           // 19
  hidden: function () {                                                // 20
    if (!Session.get('list')) {                                        // 21
      var str = "loading active";                                      // 22
      return str;                                                      // 23
    } else {                                                           //
      var list = Session.get('list');                                  // 25
      makeCloud(list);                                                 // 26
    }                                                                  //
  },                                                                   //
  list: function () {                                                  // 29
    return Session.get('list');                                        // 30
  }                                                                    //
});                                                                    //
                                                                       //
Template.wordCloud.onRendered(function () {                            // 34
                                                                       //
  //var list = Session.get('list');                                    //
  //makeCloud(list);                                                   //
                                                                       //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
