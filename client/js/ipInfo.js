
$.getJSON("http://ipinfo.io", function(data){
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
		if (!Session.get('ipInfo')) {return true}
	},
	location: function() {
		var ipInfo = Session.get('ipInfo');
		if (ipInfo) {
			var state = ipInfo.region;
		}
		return ipInfo;
	}
});
