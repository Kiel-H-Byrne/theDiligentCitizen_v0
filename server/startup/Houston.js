

Houston.add_collection( Meteor.users );
Houston.add_collection( Houston._admins );
// Houston.add_collection( Queries );


// Houston.methods("cache_rest", {
//   "Publish": function (post) {
//     Posts.update(post._id, {$set: {published: true}});
//     return post.name + " published successfully.";
//   }
// });