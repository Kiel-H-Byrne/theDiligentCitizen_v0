
Template.sponsoredBills.helpers({
	sponsored_bills: function(id) {
/*
 
*	Each legislator is on a committe, so this committee function is called inside of each legislator function.
* the 'this' object should be the legislator and the committees associated with said person.
*/
		if (id) {
			//url = /bills?sponsor_id__in=M000303|L000304
			var method = "bills";
			var params = {};
			params.sponsor_id__in=id;
			params.order="introduced_on";
			var urlParams = jQuery.param(params);
			var res = ReactiveMethod.call('sunLight', method, urlParams);
			if (res) {
				var results = res.results;
				//console.log(res);
				Session.set('sponsoredBills', results);
				//should add to a cumulative array and then make that cumulative array the cloudarray.
				Session.set('cloudArr', getFreq(results, 'official_title'));			
				return results;
			}
			
		}
	},
	render: function(){
	// semantic blur images
		$('.image').dimmer({
			on: 'hover'
		});
	// semantic popup on labels
		$('.label')
		.popup({
			inline : true,
		    position : 'top center'
		});
	}
});


//TODO: A Way to show only first N number of bills, then click dropdown to show more?
