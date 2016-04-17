// console.log("--legiScan.js");



Template.legiScanSearch.helpers({
  location: function() {
    var ipInfo = Session.get('ipInfo');
    if (ipInfo) {
      var state;
      state = ipInfo.state;
      ipInfo.region = abbr_State(state, "name");
      //console.log(ipInfo.region+" Right????");
      return ipInfo.region;
    }
  }
});


Template.legiScanSearch.events({
  'submit #legi-search': function (evt, tpl) {
    event.preventDefault();
    
    var query = tpl.find('input#query').value;

    Session.set('query', query);

    analytics.track("Legi Search", {
      query: query
    });

  }
});


Template.legiScanResults.helpers({
  query: function () {
    query = Session.get('query');
    //console.log(query);
    return query;
  },
  queryList: function() {

    var state = Session.get('ipInfo').state;

    if (Session.get('newState')) {
      state = Session.get('newState');
    }

    var params = {};
      params.query = Session.get('query');
      params.year = 2016;
      params.state = state;
  
    Session.set('query', params.query);

    var op = 'search';
    var urlParams = jQuery.param(params);

    Meteor.call('legiScan', op, urlParams, function (err, res) {
      // The method call sets the Session variable to the callback value
      if (err) { 
        return err;
      } else {
        res = res.searchresult;
        res.query = params.query;
        Session.set('results', res);
        Session.set('lsWords', getFreq(res, 'title'));
        //return res;
      }
    });

    queryArr = [];
    var obj = Session.get('results');
    for (var key in obj) {
      queryArr.push({
        name : key,
        value : obj[key]
      });
    }

    queryArr.sort(compareActionDates);

    //console.log(queryArr);
    return queryArr;
  }
});
