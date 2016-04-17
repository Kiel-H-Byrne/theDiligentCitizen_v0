
Template.sponsoredBills.helpers({
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
		params.order="introduced_on";
		var urlParams = jQuery.param(params);
		var res = ReactiveMethod.call('sunLight', method, urlParams).results;
		Session.set('sponsoredBills', res);
		//console.log(res);

		$('.test.button')
			.popup({
			    position : 'top center',
			    target   : '.test.image',
			    title    : '.title',
			    content  : '.content'
			});

		Session.set('sbWords', getFreq(res, 'official_title'));			
			return res;
		}
	}
});




//TODO: A Way to show only first N number of bills, then click dropdown to show more?
