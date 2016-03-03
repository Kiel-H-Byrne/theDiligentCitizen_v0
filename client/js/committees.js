
Template.committees.helpers({
	committees: function() {
/* 
*	Each legislator is on a committe, so this committee function is called inside of each legislator function.
* the 'this' object should be the legislator and the committees associated with said person.
*/
	  var method = 'committees';
	  var params = {};
	  params.member_ids = this.bioguide_id;
	  urlParams = jQuery.param(params);
	  if (params.member_ids) {
			return ReactiveMethod.call('sunLight', method, urlParams).results;
		}

	}

});
