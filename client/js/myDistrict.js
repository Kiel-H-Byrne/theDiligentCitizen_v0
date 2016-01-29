


Template.myDistrict.helpers ({
	get_district: function() {
		  //var method = 'districts/locate';		
	},
	legislators: function() {
		var ipInfo = Session.get('ipInfo');
	  if (ipInfo) {
		  	  //using lat/long to find user district (more precise than zip);
		  //var method = 'districts/locate';
		  var method = 'legislators/locate';
		  var params = {};
		  //params.zip = ipInfo.postal;
		  params.latitude = ipInfo.loc.split(",")[0];
		 	params.longitude = ipInfo.loc.split(",")[1];
		  urlParams = jQuery.param(params);
			Meteor.call('sunLight', method, urlParams, function (err, res) {
		    // The method call sets the Session variable to the callback value
		    if (err) { 
		      Session.set('query', {error: err});
		    } else {
		    	res = res.results;
		    	//console.log("Sesh-district: " + res.district);
					Session.set('legislators', res);
					console.log(res[0]);
		      return res;
		    }
		  });
		var legislators = Session.get('legislators');
    return legislators	
		}	
	},
	legislators2: function() {
		return Session.get('legislators');
	}

});