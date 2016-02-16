console.log("--wordcloud.js");

//WordCloud(elements, options);
//i.e. document.getElementById('my_canvas') or $('#my_canvas')[0] in jQuery.
//https://github.com/timdream/wordcloud2.js/blob/master/API.md

Template.wordCloud.helpers({
  bigList: function () {
    var list = Session.get('list');
    return list
  }
});

Tracker.autorun(function () {
  
  list2 = Session.get('list');

});

Template.wordCloud.onRendered( function() {

//  var getList = Session.get('list');
//  console.log("list is " + getList.type);
//  console.log(zipObj(getList));
  //console.log(getList);


this.autorun ;


  var list = [
  	['foo', 22],
  	['bar', 76],
  	['buzz', 58],
  	['bang', 42]
  ];



if (Session.get('list')) {list2 = zipObj(Session.get('list'))};

  var element = $('#wcloud')[0];
  var options = {
    list : list2,
    color : 'random-dark',
    classes : 'cloudWords',
    shuffle : true
    };

  WordCloud(element, options);

});


// where list is an array that look like this: [['foo', 12], ['bar', 6]].

function zipObj(obj) {
  var keys = _.keys(obj);
  var values = _.map(keys, function(k) { return obj[k]; });
  // Transpose the values matrix
  return _.zip(keys,values);
  
};
