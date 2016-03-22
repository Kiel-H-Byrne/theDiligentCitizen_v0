Template.party.helpers ({
	party: function() {

		http://politicalpartytime.org/api/v1/event/?beneficiaries__state=md&start_date__gt=2015-12-25&format=json&apikey="+Meteor.settings.public.govSettings.sunlight.apikey

		var method = 'event/';
		var params = {};
		params.beneficiaries__state = "md";
		params.start_date__gt = "2015-01-01";
		params.format = "json";
    var urlParams = jQuery.param(params);
  	var res = ReactiveMethod.call('partyTime', method, urlParams).objects;
		console.log(res);
		return res;
	}
});