// ============= GLOBALS ============

summArr = [];

joinArr = function(o, n) {
	newArr = o.concat(n);
	return newArr;
};

// ============= HELPERS ============


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
			    //set summ to wiki entry.
			    if (ReactiveMethod.call('wikiCall', urlParams)) {
					var res = ReactiveMethod.call('wikiCall', urlParams).query.pages;
					//Session.set('wikiText', res);
					// console.log(res);
					var newPair = _.pairs(res)[0];
					summ = newPair[1].extract;
					var missing = newPair[1].missing;
					if (missing === "") {
						summ = "We do not currently have a summary for "+ query+ ".";
						summ = false;
					}
				}
				//set return false if summ DNE.
				if (summ === false) {
					return false;
				} else if (summ) {
					var abbrevSumm = summ.substring(0,500);
					//console.log(summ);
					var oldSumm = summArr;
				  	summArr = oldSumm.concat( getFreq(summ) );
				  	//console.log(summArr);
				  	Session.set('cloudArr', summArr);
					return abbrevSumm;
				} else {return null;}
		},
		getVal: function(str){
		  var name = this.valueOf(str);
		  //console.log(name);
		  return name;
		}
	});

});

