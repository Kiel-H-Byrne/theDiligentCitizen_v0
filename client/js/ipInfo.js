
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
	    var abState = abbr_State(state, 'abbrev');
      console.log("Sesh-abState: "+abState);
      Session.set('abState', abState);
      ipInfo.abState = abState;
	  }
		return ipInfo;
	}
});

Template.ipInfo.events({
	'submit form': function (evt, tpl) {
		event.preventDefault();
    newState = tpl.find('input#self-state').value;
    Session.set('newState', newState);
    console.log("they put "+newState);
	}
});