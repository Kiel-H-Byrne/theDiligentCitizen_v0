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
  loader: function() {
    if (!Session.get('sbWords')) {
      var str = "loading active";
      return str;
    } else if (!Session.get('lsWords')) {
      makeCloud(Session.get('sbWords')); 
    } else {
      makeCloud(Session.get('lsWords'));
    }
  },
  list: function () {
    return Session.get('list');
  },
  list2: function() {
    var sBills = Session.get('sponsoredBills');
    var list = getFreq(sBills, 'official_title');
    console.log(list);
    return list
  }
});

Template.wordCloud.onRendered( function() {

//var list = Session.get('list');
//makeCloud(list);

});


