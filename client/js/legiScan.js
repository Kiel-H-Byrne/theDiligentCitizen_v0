/*
params
state     State abbreviation to search on, or ALL for entire nation
bill      Bill number for an exact bill number or to limit query
query     Full text query string to run against the search engine, URL encoded
year      Year where 1=all, 2=current, 3=recent, 4=prior, >1900=exact [Default: 2]
page      Result set page number to return [Default: 1]

*/

Template.legiScan.helpers({
  query: function () {
    return Session.get('query');
  },
  queryList: function() {
    queryArr = [];
    var obj = Session.get('query');
    for (var key in obj) {
      queryArr.push({
        name : key,
        value : obj[key]
      });
    }
    console.log(queryArr);
    return queryArr;
  }
});



Template.legiScan.events({
  'submit #search': function (evt, tpl) {
    event.preventDefault();
    var params = {}
    params.query = tpl.find('input#query').value;
    params.year = 2015;
    userLoc = Session.get('location');
    params.state = userLoc.region_code;
    var op = 'search';
    var urlParams = jQuery.param(params);
    Meteor.call('legiScan', op, urlParams, function (err, res) {
      // The method call sets the Session variable to the callback value
      if (err) { 
        Session.set('query', {error: err});
      } else {
        res = res.searchresult;
        Session.set('query', res);
        return res;
      }
    });
  }
});