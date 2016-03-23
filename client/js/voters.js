
Template.voters.helpers({
	data: function() {

		if (Session.get('reps')) {
			var data = Session.get('reps');
			console.log(data);
			return data;
		}
	}
});

//TODO: Take data from divisions, offices, officals; each object has 'indices' that match to the other object. create one master object per address lookup.
//https://www.googleapis.com/civicinfo/v2/representatives?address=+20902&fields=normalizedInput%2Coffices%2Cofficials&key={YOUR_API_KEY}

