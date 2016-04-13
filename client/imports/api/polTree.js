Template.polTree.onRendered( function() {
	$(function() {
	    $("#orgChart-source").orgChart({
	    	container: $("#orgChart"),
	    	interactive: true
	    });
	});
});

Template.polTree.helpers({
	
});

Template.branch.helpers({
	// getName: function(){
	// 	console.log(data.officials[index][property]);
	// }
});