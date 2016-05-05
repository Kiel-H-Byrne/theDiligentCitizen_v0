
Template.gCivic.helpers({
	social: function(property, data, index) {
		//TODO: figure out 'if this.type=GooglePlus is true, so that the icon changes'
		//set a conditional statement that returns true if type = GooglePlus
		if (data) {
			var social = data.officials[this].channels;
			isGP = function() {
				if(type == 'GooglePlus') {
					console.log('true!');
					return true;
				}
			};
			//console.log(social);
			return social;

			}
	}
});

Template.registerHelper('data', function() {
		var ipInfo = Session.get('ipInfo');
		if (ipInfo) {
		    var params = {};
  		
	  		if (Session.get('newZip')) {
			    params.address = Session.get('newZip');
		    } else { 
		    	params.address = ipInfo.loc;
		    }

		    params.fields = "divisions,normalizedInput,offices,officials";
		    //console.log("the params {} is", params);
		    var urlParams = jQuery.param(params);
		    //console.log(urlParams);
		    var method = "representatives";
		    var res = ReactiveMethod.call('googleCivic', method, urlParams);
//			if (typeof Session.get('normAdd') === 'undefined') {			
			if (typeof res === 'undefined') {
				console.log(res);
				Session.set('normAdd', jQuery.param(res.normalizedInput));
				Session.set('divs',Object.keys(res.divisions));
			}
		    
		    Session.set('reps', res);
    	// semantic blur images
			$('.image').dimmer({
				on: 'hover'
			});
		    return res;
	    }
});

Template.registerHelper('getOfficial',function(property, data, index) {
	if (data) {
		return data.officials[index][property];
	}
});

Template.registerHelper('capitalize',function toTitleCase(str) { 
	if (typeof str !== 'undefined') {	
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
});


Template.registerHelper('getOffice',function(property, data, index) {
	if (data) {
		// console.log(data.offices[index][property]);
		// console.log(data.offices[index]);
		return data.offices[index][property];
	}
});

//TODO: Take data from divisions, offices, officals; each object has 'indices' that match to the other object. create one master object per address lookup.
//https://www.googleapis.com/civicinfo/v2/representatives?address=+20902&fields=normalizedInput%2Coffices%2Cofficials&key={YOUR_API_KEY}

