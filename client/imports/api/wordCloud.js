//console.log("--wordcloud.js");

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
    if (Session.get('cloudArr')) {
      var arr = Session.get('cloudArr');
      makeCloud(arr);
      return true;
    //   makeCloud(Session.get('sbWords')); 
    // } else if (Session.get('lsWords')) {
    //   makeCloud(Session.get('lsWords'));
    // } else if (Session.get('bioWords')) {
    //   var arr = session.get('bioWords')
    //   makeCloud(Session.get('bioWords'));
    } else {
      var str = "loading active";
      return str;      
    }
  }
});

