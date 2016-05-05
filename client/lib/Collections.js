UserInfo = new Mongo.Collection('userInfo');
Elections = new Mongo.Collection('electionEvents');

if (Meteor.isServer) {

	Houston.add_collection(userInfo);
	Houston.add_collection(electionEvents);

	Meteor.publish("userInfo", function () {
		return UserInfo.find();
	});


	Meteor.publish("electionEvents", function () {
		return Elections.find();
	}); 

}