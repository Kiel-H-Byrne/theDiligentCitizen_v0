Template.fundRaisers.helpers ({
	fundraiser: function(method) {

//		http://politicalpartytime.org/api/v1/event/?beneficiaries__state=md&start_date__gt=2015-12-25&format=json&apikey="+Meteor.settings.public.govSettings.sunlight.apikey

		method = 'event/';
		var params = {};
		params.beneficiaries__state = "md";
		params.start_date__gt = "2015-01-01";
		params.format = "json";
    	var urlParams = jQuery.param(params);
  		var res = ReactiveMethod.call('partyTime', method, urlParams);
		if (res) {
			console.log(res.objects);
		}
		return res.objects;
	}
});