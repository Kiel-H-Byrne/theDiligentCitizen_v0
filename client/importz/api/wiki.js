
Template.wiki.helpers({
	wikiText: function(query) {
    var params = {};
    params.format='json';
    params.action='query';
    params.prop='extracts';
    params.exintro='';
    params.explaintext='';
    params.redirects='';
    if (query) {
    	params.titles = query;
    } else {params.titles =''};
    var urlParams = jQuery.param(params);
	  var res = ReactiveMethod.call('wikiCall', urlParams).query.pages;
	  //Session.set('wikiText', res);
	  //console.log(res);
	  var newPair = _.pairs(res)[0];
		var sum = newPair[1]['extract'];
		//console.log(sum);
		return sum;
	},
	getName: function(){
	  var name = this.valueOf();
	  return name;
	}
});