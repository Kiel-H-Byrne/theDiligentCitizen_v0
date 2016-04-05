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
	}
});