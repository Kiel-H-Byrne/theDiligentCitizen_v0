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

