Template.branch.onRendered( function() {
	// $(function() {
	//     $("#orgChart-source").orgChart({
	//     	container: $("#orgChart"),
	//     	interactive: true
	//     });
	// });
});

Meteor.methods({
	render: function() {
	    $("#orgChart-source").orgChart({
	    	container: $("#orgChart"),
	    	interactive: true
	    });
	}
});

Template.branch.helpers({
	hasSibs: function() {
		if (this.officialIndices) {
			count = this.officialIndices.length;
			console.log(count);
			if (count > 1) {
				return true;
			}
		}
	}
});

