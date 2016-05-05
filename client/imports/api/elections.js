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
				Elections.insert(res.elections);
				var num = Elections.find().count();
				console.log("some such events, " + num);
				return res;
			}
//		}
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
		// console.log(id); 
		console.log(jQuery.inArray(id,divs));
		if (jQuery.inArray(id,divs) !== -1 ) {
			return true;	
		}
		
	}
});



//https://www.googleapis.com/civicinfo/v2/representatives?address=+20902&fields=normalizedInput%2Coffices%2Cofficials&key={YOUR_API_KEY}

