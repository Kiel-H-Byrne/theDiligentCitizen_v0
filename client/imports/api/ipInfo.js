$.getJSON("http://ipinfo.io", function(data){
//	console.log("--setting initial ipInfo--");
	Session.set('ipInfo', data);
});

analytics.track( 'ipInfo data', {
  title: 'Pulled Geo Info',
  data: Session.get('ipInfo)')
});

			/*
			city: "Silver Spring"
			country: "US"
			hostname: "c-69-138-161-94.hsd1.md.comcast.net"
			ip: "69.138.161.94"
			loc: "39.0261,-77.0084"
			org: "AS7922 Comcast Cable Communications, Inc."
			postal: "20901"
			region: "Maryland"
			*/

Template.ipInfo.helpers({
	location: function() {
		if ( Session.get('ipInfo') ) {
			var ipInfo = Session.get('ipInfo');
			return ipInfo;
		} else {
			//string is loading for semantic 'loader' class
			var string = "loading";
			return string;
		}
	}
});

Template.ipInfo.events({
	//when form is submitted, change the 'found' state to the one entered.
	'submit form': function (evt, tpl) {
		event.preventDefault();
		//if entered is a string, set value to state
   var entered = tpl.find('input#self-state').value;
	 if (entered.length === 5 ) {
	    var newZip = entered;
	    Session.set('newZip', newZip);
	    console.log("they put "+newZip);
	  }
    //else if entered a number , set value to zipcode
	
    analytics.track("Entered Zipcode", {
      zip: entered
    });

	}
});