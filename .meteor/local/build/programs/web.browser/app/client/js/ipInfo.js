(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/ipInfo.js                                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
$.getJSON("http://ipinfo.io", function (data) {                        // 1
	console.log("--setting initial ipInfo--");                            // 2
	Session.set('ipInfo', data);                                          // 3
});                                                                    //
                                                                       //
analytics.track('Viewed the HomePage', {                               // 6
	title: 'ipInfo test'                                                  // 7
});                                                                    //
                                                                       //
/*                                                                     //
city: "Silver Spring"                                                  //
country: "US"                                                          //
hostname: "c-69-138-161-94.hsd1.md.comcast.net"                        //
ip: "69.138.161.94"                                                    //
loc: "39.0261,-77.0084"                                                //
org: "AS7922 Comcast Cable Communications, Inc."                       //
postal: "20901"                                                        //
region: "Maryland"                                                     //
*/                                                                     //
                                                                       //
Template.ipInfo.helpers({                                              // 21
	locating: function () {                                               // 22
		if (!Session.get('ipInfo')) {                                        // 23
			return "loading";                                                   // 24
		}                                                                    //
	},                                                                    //
                                                                       //
	location: function () {                                               // 28
		var ipInfo = Session.get('ipInfo');                                  // 29
		return ipInfo;                                                       // 30
	}                                                                     //
});                                                                    //
                                                                       //
Template.ipInfo.events({                                               // 34
	//when form is submitted, change the 'found' state to the one entered.
	'submit form': function (evt, tpl) {                                  // 36
		event.preventDefault();                                              // 37
		//if entered is a string, set value to state                         //
		var entered = tpl.find('input#self-state').value;                    // 39
		if (entered.length === 5) {                                          // 40
			var newZip = entered;                                               // 41
			Session.set('newZip', newZip);                                      // 42
			console.log("they put " + newZip);                                  // 43
		}                                                                    //
		//else if entered a number , set value to zipcode                    //
                                                                       //
		analytics.track("Entered Zipcode", {                                 // 47
			zip: entered                                                        // 48
		});                                                                  //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
