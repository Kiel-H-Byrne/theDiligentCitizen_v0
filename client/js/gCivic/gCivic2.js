
Template.gCivic2.helpers({
	data: function() {

		if (Session.get('reps')) {
			var data = Session.get('reps');
			console.log(data);
			return data;
		}
	},
	getOfficialPhoto: function(data, index) {
		console.log("args::::::::::::::+{}", arguments);
		return data.officials[index].photoUrl;
	},
	getOfficialName: function(data, index) {
		console.log("args::::::::::::::{}-------------{}", data, index);

		return data.officials[index].name;
	}

});

//TODO: Take data from divisions, offices, officals; each object has 'indices' that match to the other object. create one master object per address lookup.
//https://www.googleapis.com/civicinfo/v2/representatives?address=+20902&fields=normalizedInput%2Coffices%2Cofficials&key={YOUR_API_KEY}

