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



Template.wordCloud.onRendered( function() {

//  var getList = Session.get('list');
//  console.log("list is " + getList.type);
//  console.log(zipObj(getList));
  //console.log(getList);

  var list = [
  	['foo', 22],
  	['bar', 46],
  	['buzz', 58],
  	['bang', 32]
  ];

if (Session.get('list')) {list = zipObj(Session.get('list'))};

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

function zipObj(obj) {
  var keys = _.keys(obj);
  var values = _.map(keys, function(k) { return obj[k]; });
  // Transpose the values matrix
  return _.zip(keys,values);
  
};
