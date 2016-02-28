(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/myDistrict.js                                             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
console.log("--myDistrict.js");                                        // 1
                                                                       //
Template.myDistrict.helpers({                                          // 3
	location: function () {                                               // 4
		//if ipInfo object exists, abbreviate the state and add it to the object.
		var ipInfo = Session.get('ipInfo');                                  // 6
		//using zipcode to return user district and state;                   //
		var method = 'districts/locate';                                     // 8
		var params = {};                                                     // 9
		if (ipInfo) {                                                        // 10
			//when 'newZip' changes, this view rerenders and makes a new call for district.
			if (Session.get('newZip')) {                                        // 12
				ipInfo.postal = Session.get('newZip');                             // 13
				params.zip = ipInfo.postal;                                        // 14
			} else {                                                            //
				params.latitude = ipInfo.loc.split(",")[0];                        // 16
				params.longitude = ipInfo.loc.split(",")[1];                       // 17
			}                                                                   //
			urlParams = jQuery.param(params);                                   // 19
			Meteor.call('sunLight', method, urlParams, function (err, res) {    // 20
				// The method call sets the Session variable to the callback value
				if (err) {                                                         // 22
					console.log("!!! ERROR with sunLight call in myDistrict");        // 23
					Session.set('query', { error: err });                             // 24
				} else {                                                           //
					res = res.results;                                                // 26
					//console.log("Sesh-district: " + res.district);                  //
                                                                       //
					//adding ipInfo Object: districts, params, state                  //
					ipInfo.districts = res;                                           // 30
					ipInfo.params = urlParams;                                        // 31
					ipInfo.state = ipInfo.districts[0].state;                         // 32
					//console.log(ipInfo.state);                                      //
					Session.set('ipInfo', ipInfo);                                    // 34
				}                                                                  //
			});                                                                 //
			return ipInfo;                                                      // 37
		}                                                                    //
	},                                                                    //
	legislators: function () {                                            // 40
		var ipInfo = Session.get('ipInfo');                                  // 41
		if (ipInfo) {                                                        // 42
			//using lat/long to find user district (more precise than zip);     //
			//var method = 'districts/locate';                                  //
			var method = 'legislators/locate';                                  // 45
			var params = {};                                                    // 46
                                                                       //
			if (ipInfo.postal = Session.get('newZip')) {                        // 48
				params.zip = ipInfo.postal;                                        // 49
			} else {                                                            //
				params.latitude = ipInfo.loc.split(",")[0];                        // 51
				params.longitude = ipInfo.loc.split(",")[1];                       // 52
			}                                                                   //
                                                                       //
			urlParams = jQuery.param(params);                                   // 55
			Meteor.call('sunLight', method, urlParams, function (err, res) {    // 56
				// The method call sets the Session variable to the callback value
				if (err) {                                                         // 58
					Session.set('query', { error: err });                             // 59
				} else {                                                           //
					res = res.results;                                                // 61
					//console.log("Sesh-district: " + res.district);                  //
					Session.set('legislators', res);                                  // 63
					//console.log(res[0]);                                            //
					return res;                                                       // 65
				}                                                                  //
			});                                                                 //
			var legislators = Session.get('legislators');                       // 68
			return legislators;                                                 // 69
                                                                       //
			/*                                                                  //
   {                                                                   //
   	bioguide_id: 'C000141',                                            //
   	birthday: '1943-10-05',                                            //
   	chamber: 'senate',                                                 //
   	contact_form: 'http://www.cardin.senate.gov/contact/',             //
   	crp_id: 'N00001955',                                               //
   	district: null,                                                    //
   	facebook_id: '120421834675191',                                    //
   	fax: '202-224-1651',                                               //
   	fec_ids: [Object],                                                 //
   	first_name: 'Benjamin',                                            //
   	gender: 'M',                                                       //
   	govtrack_id: '400064',                                             //
   	icpsr_id: 15408,                                                   //
   	in_office: true,                                                   //
   	last_name: 'Cardin',                                               //
   	lis_id: 'S308',                                                    //
   	middle_name: 'L.',                                                 //
   	name_suffix: null,                                                 //
   	nickname: null,                                                    //
   	oc_email: 'Sen.Cardin@opencongress.org',                           //
   	ocd_id: 'ocd-division/country:us/state:md',                        //
   	office: '509 Hart Senate Office Building',                         //
   	party: 'D',                                                        //
   	phone: '202-224-4524',                                             //
   	senate_class: 1,                                                   //
   	state: 'MD',                                                       //
   	state_name: 'Maryland',                                            //
   	state_rank: 'junior',                                              //
   	term_end: '2019-01-03',                                            //
   	term_start: '2013-01-03',                                          //
   	thomas_id: '00174',                                                //
   	title: 'Sen',                                                      //
   	twitter_id: 'SenatorCardin',                                       //
   	votesmart_id: 26888,                                               //
   	website: 'http://www.cardin.senate.gov',                           //
   	youtube_id: 'senatorcardin'                                        //
   }                                                                   //
   */                                                                  //
		}                                                                    //
	},                                                                    //
	party_color: function () {                                            // 113
		//var reps = Session.get('legislators');                             //
		var party = this.party;                                              // 115
                                                                       //
		if (party == "D") {                                                  // 117
			return "blue";                                                      // 117
		} else if (party == "R") {                                           //
			return "red";                                                       // 118
		} else {                                                             //
			return "green";                                                     // 119
		}                                                                    //
	}                                                                     //
                                                                       //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
