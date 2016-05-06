Template.register.events({
  'submit form' ( event, template ) {
    event.preventDefault();
    
    let email    = template.find( "[name='emailAddress']" ).value,
        password = template.find( "[name='password']" ).value;
    
    Accounts.createUser( { email: email, password: password }, ( error ) => {
      if ( error ) {
        console.log( error.reason );
      }
    });
  }
});
