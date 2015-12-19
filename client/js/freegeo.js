Template.freegeo.helpers({
  location: function () {
    return Session.get('location');
  }
});

Template.freegeo.events({
  'submit #ipfield': function (evt, tpl) {
    event.preventDefault();
    var ip = tpl.find('input#ipv4').value;
    Meteor.call('geoJsonForIp', ip, function (err, res) {
      // The method call sets the Session variable to the callback value
      if (err) { 
        Session.set('location', {error: err});
      } else {
        Session.set('location', res);
        console.log(res);
        return res;
      }
    });
  }
});
