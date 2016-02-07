console.log("--legiScan.js");

/*
params
state     State abbreviation to search on, or ALL for entire nation
bill      Bill number for an exact bill number or to limit query
query     Full text query string to run against the search engine, URL encoded
year      Year where 1=all, 2=current, 3=recent, 4=prior, >1900=exact [Default: 2]
page      Result set page number to return [Default: 1]

*/

Template.legiScanSearch.helpers({
  location: function() {
    var ipInfo = Session.get('ipInfo');
    if (ipInfo) {
      var state;
      state = ipInfo.state;
      fullName = abbr_State(state, "name");
      console.log(fullName);
    return ipInfo.region;
    } else {console.log("ipInfo doesn't exist yet for legiScanSearch")}
  }
});

Template.legiScanResults.query2 = function() {
  
};

Template.legiScanResults.helpers({

  query: function () {
    query = Session.get('results');
    //console.log(query);
    return query;
  },
  queryList: function() {
    queryArr = [];
    var obj = Session.get('results');
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



Template.legiScanSearch.events({
  'submit #legi-search': function (evt, tpl) {
    event.preventDefault();
    var state = Session.get('ipInfo').state;
    if (Session.get('newState')) {
      state = Session.get('newState');
    }
    console.log("Searching in "+state);
    var params = {};
    params.query = tpl.find('input#query').value;
    params.year = 2016;
    params.state = state;
    var op = 'search';
    var urlParams = jQuery.param(params);
    Meteor.call('legiScan', op, urlParams, function (err, res) {
      // The method call sets the Session variable to the callback value
      if (err) { 
        Session.set('results', {error: err});
      } else {
        res = res.searchresult;
        res.query = params.query;
        Session.set('results', res);
        return res;
      }
    });
  }
});


