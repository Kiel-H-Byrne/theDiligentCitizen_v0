
Template.nybills.helpers({
	spon_bills: function() {
/* 
*	Each legislator is on a committe, so this committee function is called inside of each legislator function.
* the 'this' object should be the legislator and the committees associated with said person.
*/
	  var memberID = this.bioguide_id;
	  if (this.bioguide_id) {
	  	var res = ReactiveMethod.call('nytBills', memberID).results;
			//console.log(res[0].bills);
			return res;
		}
	}
});
