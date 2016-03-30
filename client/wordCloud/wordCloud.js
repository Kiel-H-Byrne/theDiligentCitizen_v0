console.log("--wordcloud.js");

/* Utilizing WordCloud2.js
* API DOCS: https://github.com/timdream/wordcloud2.js/blob/master/API.md
*
*
*
*   WordCloud(elements, options);
*   i.e. document.getElementById('my_canvas') or $('#my_canvas')[0] in jQuery.
*   
*    var list = [
*      ['foo', 22],
*      ['bar', 76],
*      ['buzz', 58],
*      ['bang', 42]
*    ]
*/

Template.wordCloud.helpers({
  hidden: function() {
    if (!Session.get('list')) {
      var str = "loading active";
      return str;
    } else {
      var list = Session.get('list');
      makeCloud(list);
    }
  },
  list: function () {
    return Session.get('list');
  },
  list2: function() {
    var sBills = Session.get('sponsoredBills');
    var list2 = getFreq(sBills);
    console.log(list2);
    return sponsoredList
  }
});

Template.wordCloud.onRendered( function() {

//var list = Session.get('list');
//makeCloud(list);

});


