Template.polTree.onRendered( function() {

	$(function() {
	    $("#orgChart-source").orgChart({
	    	container: $("#orgChart"),
	    	interactive: true
	    });
	});

});

Template.polTree.helpers({
	getOfficial: function(property, data, index) {
		if (data) {
			console.log(property, data, index);
			return data.officials[index][property];
		}
	},
	newRow: function(did) {
//TODO: Need to get how many 'levels' there are to the org chart, 

		//get current value of 'divisionId' & compare it to last division.
		//if different, create a new <'ul'> for it, otherwise leave it as a <li>
		//return true if different
		//Whatever i do, i get a loop on the client!!
		var last = getLast();
		var curr = this.divisionId.valueOf();
		var isDiff = bool;
		if (curr != last) {
			isDiff = true;
			Session.set('lastDid', curr);
			console.log(isDiff);			
			return isDiff;
		}
		else {
			isDiff = false;
			console.log(curr);			
			return isDiff;
		}
	},
	branch: function(){
		
	}		
});

var	getLast = function() {
		console.log(Session.get('lastDid'));
		return Session.get('lastDid');
	};

	
// getOfficial = function(property, data, index) {
// 	if (data) {
// 		return data.officials[index][property];
// 	}
// };