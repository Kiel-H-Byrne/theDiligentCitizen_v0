Template.upcoming.helpers({
	upcoming: function() {
/* 
*	Each legislator is on a committe, so this committee function is called inside of each legislator function.
* the 'this' object should be the legislator and the committees associated with said person.
*/
	  var method = 'upcoming_bills';
	  var params = {};
	  urlParams = jQuery.param(params);
	  var res = ReactiveMethod.call('sunLight', method, urlParams);
	  if (res) {
	  		var results = res.results;
	  		console.log(results);
			return results;
		}
	},
	render: function() {
		// semantic popup on labels
			$('.label')
			.popup({
				inline : true,
			    position : 'bottom right'
			});
	}
});

