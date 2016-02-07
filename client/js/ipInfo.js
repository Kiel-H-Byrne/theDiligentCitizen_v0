console.log("--ipInfo.js");
$.getJSON("http://ipinfo.io", function(data){
//	console.log("--setting initial ipInfo--");
//	console.log(data);
	Session.set('ipInfo', data);
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
	locating: function() {
		if (!Session.get('ipInfo')) {
			return "loading"
		}
	},
	location: function() {
		var ipInfo = Session.get('ipInfo');
		console.log(ipInfo);
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
	}
});