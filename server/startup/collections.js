
// Houston.add_collection( Meteor.users )
// Houston.add_collection( Houston._admins )

// Meteor.publish("userInfo", function () {
// 	return UserInfo.find();
// });

var id = Accounts.createUser({
    email: "kiel.byrne@gmail.com",
    password: "vivitron",
    profile: { name: "KHB" }
});

Roles.addUsersToRoles(id, ['admin'], 'default-group');


if (Meteor.isServer) {
	Meteor.startup( function() {
		Posts = new Meteor.Collection('posts');

		AdminConfig = { 
			adminEmails: ['	kiel.byrne@gmail.com '], 
			collections: { 
				Posts: {} 
			}
		}
	});
}