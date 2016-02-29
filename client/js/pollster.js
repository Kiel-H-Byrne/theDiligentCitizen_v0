
Template.pollster.helpers({
	charts: function() {
/* 
http://elections.huffingtonpost.com/pollster/api
*	Each state has pollster charts, this returns values.


METHODS: 
/charts/
/charts/SLUG/
/polls/
*/
	  var method = 'charts';
	  var params = {};
	  params.state = this.bioguide_id;
	  console.log(params.state);
	  urlParams = jQuery.param(params);
	  if (params.state) {
			return ReactiveMethod.call('pollster', method, urlParams).results;
		}

	}

});
