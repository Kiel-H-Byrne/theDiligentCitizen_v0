// Errors = new Mongo.Collection(null);

Template.errors.helpers({
	errors: function() {
	    return Errors.find();
	}
});


// Template.error.helpers({
// 	close : function(id) {
// 		console.log(id);
// 	}
// });

Template.error.events({
	'click .message .close' : function () {
		Errors.remove(this._id);
		console.log('bye bitch!!')		;
		$(this)
		.closest('.message')
		.transition('fade');
	}

})


// Template.error.onRendered( function() {
// 	$('.message .close')
// 	.on('click', function() {
// 		$(this)
// 		.closest('.message')
// 		.transition('fade');
// 		Errors.remove({});
// 	});

// });