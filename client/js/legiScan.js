/*
params
state     State abbreviation to search on, or ALL for entire nation
bill      Bill number for an exact bill number or to limit query
query     Full text query string to run against the search engine, URL encoded
year      Year where 1=all, 2=current, 3=recent, 4=prior, >1900=exact [Default: 2]
page      Result set page number to return [Default: 1]

*/

Template.ipInfo.onRendered( function() {
  var ipInfo = Session.get('ipInfo');
  if (ipInfo) {
    var state = ipInfo.region;
    var abState = abbr_State(state, 'abbrev');
    if (abState) {
      console.log("Sesh-abState: "+abState);
      Session.set('abState', abState);
    }
  }
});

Template.legiScan.helpers({
  location: function() {
    var ipInfo = Session.get('ipInfo');
    if (ipInfo) return ipInfo.region;
  },
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
    //console.log(queryArr);
    return queryArr;
  }
});



Template.legiScan.events({
  'submit #search': function (evt, tpl) {
    event.preventDefault();
    var state = Session.get('abState');
    console.log("Searching in "+state);
    var params = {}
    params.query = tpl.find('input#query').value;
    params.year = 2015;
    params.state = state;
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


