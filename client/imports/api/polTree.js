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
			return data.officials[index][property];
		}
	},
	newRow: function(did) {
//TODO: Need to get how many 'levels' there are to the org chart, 

		//get current value of 'divisionId' & compare it to current version.
		//if different, create a new <'ul'> for it, otherwise leave it be.
		//return true if different



	}
});
