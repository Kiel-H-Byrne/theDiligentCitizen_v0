
Template.sponsoredBills.helpers({
   reps: function() {
      var reps = Session.get('legislators');
      return reps;      
   },
	sponsored_bills: function() {
/* 
*	Each legislator is on a committe, so this committee function is called inside of each legislator function.
* the 'this' object should be the legislator and the committees associated with said person.
*/
	  if (this.bioguide_id) {
      //url = /bills?sponsor_id__in=M000303|L000304
      var method = "bills";
      var params = {};
      params.sponsor_id__in=this.bioguide_id;
      var urlParams = jQuery.param(params);
	  	var res = ReactiveMethod.call('sunLight', method, urlParams).results;
			console.log(res);
			return res;
		}
	}
});


/*{
   "status":"OK",
   "copyright":"Copyright (c) 2010 The New York Times Company. All Rights Reserved.",
   "results":[
      {
         "id":"P000587",
         "member_uri":"http://api.nytimes.com/svc/politics/
            v3/us/legislative/congress/members/P000587.json",
         "name":"Mike Pence",
         "num_results":"20",
         "offset":"0",
         "bills":[
            {
               "number":"H.RES.807",
               "bill_uri":"http://api.nytimes.com/svc/politics/
                  v3/us/legislative/congress/111/bills/hres807.json",
               "title":"Electing a minority member to a standing committee.",
               "sponsor_id":"P000587",
               "introduced_date":"2009-10-07",
               "cosponsors":"0",
               "committees":"",
               "latest_major_action_date":"2009-10-07",
               "latest_major_action":"Passed/agreed to in House. Status: On
                  agreeing to the resolution Agreed to without objection."
            },
            ...
            {
               "number":"H.RES.1087",
               "bill_uri":"http://api.nytimes.com/svc/politics/
                  v3/us/legislative/congress/109/bills/hres1087.json",
               "title":"Designating Room H-139 of the Capitol as the 'Henry J.
                  Hyde Room'.",
               "sponsor_id":"P000587",
               "introduced_date":"2006-11-15",
               "cosponsors":"38",
               "committees":"House Transportation and Infrastructure",
               "latest_major_action_date":"2006-12-05",
               "latest_major_action":"Passed/agreed to in House. Status: On
                  motion to suspend the rules and agree to the resolution
                  Agreed to by voice vote."
            }
         ]
      }
   ]
}*/
