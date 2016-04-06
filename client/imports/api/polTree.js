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

		//get current value of 'divisionId' & compare it to current version.
		//if different, create a new <'ul'> for it, otherwise leave it be.
		//return true if different
		var lastDid = Session.get('curDiv');
		var now = this.divisionId;
		console.log(now);
		var last = lastDid;
		if (now === last) {
			var newRow = true;
			return newRow;
		}
		else {
			newRow = false;
			console.log(newRow);			
			//Session.set('curDiv', now);
			return newRow;
		}
	}
});
