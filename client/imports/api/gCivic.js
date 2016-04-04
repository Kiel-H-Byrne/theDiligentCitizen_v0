
Template.gCivic.helpers({
	data: function() {
		var ipInfo = Session.get('ipInfo');
		if (ipInfo) {
	    var params = {};
  		
  		if (Session.get('newZip')) {
		    params.address = Session.get('newZip');
	    } else { 
	    	params.address = ipInfo.loc;
	    }

	    params.fields = "normalizedInput,offices,officials";
	    //console.log("the params {} is", params);
	    var urlParams = jQuery.param(params);
	    //console.log(urlParams.length);
	    var method = "representatives";
	    var res = ReactiveMethod.call('googleCivic', method, urlParams);
	    //console.log(res);
	    Session.set('reps', res);
	    
	    return res;
	    //TODO: Need to make array of objects for the politicalTree chart
    }
	},
	getOfficial: function(property, data, index) {
		if (data) {
			return data.officials[index][property];
		}
	},
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


//TODO: Take data from divisions, offices, officals; each object has 'indices' that match to the other object. create one master object per address lookup.
//https://www.googleapis.com/civicinfo/v2/representatives?address=+20902&fields=normalizedInput%2Coffices%2Cofficials&key={YOUR_API_KEY}

/* ------- Semantic UI Modules --------  */
/**
Template.gCivic.onRendered(function() {

	$('.image').dimmer({
	  on: 'hover'
	});

});

**/
