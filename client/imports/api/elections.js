Template.elections.onCreated(function() {
	Meteor.subscribe('electionEvents');
});

Template.elections.helpers({
	events: function() {
/* 
* Each legislator is on a committe, so this committee function is called inside of each legislator function.
* the 'this' object should be the legislator and the committees associated with said person.
*/
//		if (Elections.find().count() === 0) {

			var method = "elections";
			var params = {};
			params.fields = "elections";
			var urlParams = jQuery.param(params);
			var res = ReactiveMethod.call('googleCivic', method, urlParams);
			if (typeof res !== 'undefined') {

				//removes first value of array (VIP Test Election) 
				res.elections.shift();
				return res;
			}
//		}
	},
	events2: function() {
		var num = Elections.find().count();
		console.log(num + "election events");
		return Elections.find();
	},
	voterinfo: function(id) {
/* 
* Searches with an address for voter information. Each election event has an ID, which can also be used to search.

//get more info with more address info.
// https://www.googleapis.com/civicinfo/v2/voterinfo?address=31%20S%20Parker%20St,%20Lowell,%20OR%2097452&electionId=4206&key=AIzaSyBNzyA3bLJAEgG5Uaod51j6g_8sBlTk26E
// https://www.googleapis.com/civicinfo/v2/voterinfo?address=43.917121%2C-122.778832&electionId=4259&key
*/
		var method = "voterinfo";
		var params = {};
		// params.fields = "elections";
		params.fields = "normalizedInput,dropOffLocations"
		params.address = Session.get('newLoc');
		params.electionId = id;
		var urlParams = jQuery.param(params);
		var res = ReactiveMethod.call('googleCivic', method, urlParams);
		if (res) {
			//removes first value of array (VIP Test Election) 
			//res.elections.shift();

			console.log(res);
			return res;
		}
	}, 
	location : function(index) {
		console.log(this);
	},
	divMatch: function(id) {
		let userDivs = Meteor.users.find({
			_id : Meteor.user()._id,
			// "profile.divs" : id
		}).fetch()[0].profile.divs;
		let entered = Session.get('newZip');
		let match = -1;
		if (typeof entered !== 'undefined') {
			let params = {};
			params.address = entered;
		    params.fields = "divisions";
		    // console.log("the params {} is", params);
		    var urlParams = jQuery.param(params);
		    //console.log(urlParams);
		    let method = "representatives";
		    let res = ReactiveMethod.call('googleCivic', method, urlParams);
		    if (res) {
			    let searchDivs = _.toArray(Object.keys(res.divisions));
			    // console.log(searchDivs);
				match = jQuery.inArray(id,searchDivs);
				// console.log('comparing to search divisions: '+match);
				}
		} else if (userDivs) {
			match = jQuery.inArray(id,userDivs);
			// console.log('comparing to user divisions: '+match);
		}
		else {
			match = -1;
			// console.log ("nothing to compare with");
		}

		if (match !== -1 ) {
			console.log('MATCH in '+ this.name);
			return true;	
		}
		
	}
	
});



//https://www.googleapis.com/civicinfo/v2/representatives?address=+20902&fields=normalizedInput%2Coffices%2Cofficials&key={YOUR_API_KEY}

