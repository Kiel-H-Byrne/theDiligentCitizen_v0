Template.gCivic.onRendered(function() {
	Template.wiki.helpers({
		wikiText: function(query) {

			    var params = {};
			    params.format='json';
			    params.action='query';
			    params.prop='extracts';
			    params.exintro='';
			    params.explaintext='';
			    params.redirects='';
		    	params.titles = query;
			    var urlParams = jQuery.param(params);
			    var summ;
			    if (ReactiveMethod.call('wikiCall', urlParams)) {
					var res = ReactiveMethod.call('wikiCall', urlParams).query.pages;
					//Session.set('wikiText', res);
					// console.log(res);
					var newPair = _.pairs(res)[0];
					summ = newPair[1].extract;
					var missing = newPair[1].missing;
					if (missing === "") {
						summ = "We do not currently have a summary for "+ query+ ".";
					}
				}
				return summ;

		},
		getName: function(){
		  var name = this.valueOf();
		  return name;
		}
	});

});