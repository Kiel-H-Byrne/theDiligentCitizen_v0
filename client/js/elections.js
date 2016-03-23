
Template.elections.helpers({
	data: function() {
/* 
* Each legislator is on a committe, so this committee function is called inside of each legislator function.
* the 'this' object should be the legislator and the committees associated with said person.
*/

		var method = "elections";
		var params = {};

		var res = ReactiveMethod.call('googleCivic', method);
		console.log(res);
		return res;
	}
});



//https://www.googleapis.com/civicinfo/v2/representatives?address=+20902&fields=normalizedInput%2Coffices%2Cofficials&key={YOUR_API_KEY}

