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
	voterinfo: function(add, id) {
/* 
* Searches with an address for voter information. Each election event has an ID, which can also be used to search.
*/
		var method = "voterinfo";
		var params = {};
		params.fields = "elections";
		params.address = Session.get('normAdd');
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
	divMatch: function(id) {
		var divs = Session.get('div');
		var users = Meteor.users.find({
			_id : Meteor.user()._id,
			// "profile.divs" : id
		}).fetch();
		var divz = users[0].profile.divs;
		console.log(divz);
		console.log(id); 
		var match = jQuery.inArray(id,divz);
		if (match !== -1 ) {
			console.log('MATCH!!');
			return true;	
		}
		
	}
});



//https://www.googleapis.com/civicinfo/v2/representatives?address=+20902&fields=normalizedInput%2Coffices%2Cofficials&key={YOUR_API_KEY}

