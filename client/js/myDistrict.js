
Template.myDistrict.helpers ({
	location: function() {
		var ipInfo = Session.get('ipInfo');
		if (Session.get('newZip')) { 
			ipInfo.postal = Session.get('newZip');
		}
		return ipInfo;
	},
	legislators: function() {
		var ipInfo = Session.get('ipInfo');

	  if (ipInfo) {
		  	  //using lat/long to find user district (more precise than zip);
		  //var method = 'districts/locate';
		  var method = 'legislators/locate';
		  var params = {};
		  if (Session.get('newZip')) {
		  	params.zip = Session.get('newZip');
		  } else { 
		  	params.latitude = ipInfo.loc.split(",")[0];
			 	params.longitude = ipInfo.loc.split(",")[1];
			}
		  urlParams = jQuery.param(params);
			Meteor.call('sunLight', method, urlParams, function (err, res) {
		    // The method call sets the Session variable to the callback value
		    if (err) { 
		      Session.set('query', {error: err});
		    } else {
		    	res = res.results;
		    	//console.log("Sesh-district: " + res.district);
					Session.set('legislators', res);
					console.log(res[0]);
		      return res;
		    }
		  });
		var legislators = Session.get('legislators');
    return legislators;

/*
{ 
	bioguide_id: 'C000141',
	birthday: '1943-10-05',
	chamber: 'senate',
	contact_form: 'http://www.cardin.senate.gov/contact/',
	crp_id: 'N00001955',
	district: null,
	facebook_id: '120421834675191',
	fax: '202-224-1651',
	fec_ids: [Object],
	first_name: 'Benjamin',
	gender: 'M',
	govtrack_id: '400064',
	icpsr_id: 15408,
	in_office: true,
	last_name: 'Cardin',
	lis_id: 'S308',
	middle_name: 'L.',
	name_suffix: null,
	nickname: null,
	oc_email: 'Sen.Cardin@opencongress.org',
	ocd_id: 'ocd-division/country:us/state:md',
	office: '509 Hart Senate Office Building',
	party: 'D',
	phone: '202-224-4524',
	senate_class: 1,
	state: 'MD',
	state_name: 'Maryland',
	state_rank: 'junior',
	term_end: '2019-01-03',
	term_start: '2013-01-03',
	thomas_id: '00174',
	title: 'Sen',
	twitter_id: 'SenatorCardin',
	votesmart_id: 26888,
	website: 'http://www.cardin.senate.gov',
	youtube_id: 'senatorcardin' 
}
*/
		}	
	},
	party_color: function() {
		//var reps = Session.get('legislators');
		var party = this.party;
		
		if (party == "D") {return "blue"}
			else if (party =="R") {return "red"}
				else {return "green"}
	}

});