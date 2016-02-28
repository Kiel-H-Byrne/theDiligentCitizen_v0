(function(){
Template.__checkName("wordCloud");
Template["wordCloud"] = new Template("Template.wordCloud", (function() {
  var view = this;
  return HTML.DIV({
    id: "wcloud-container",
    "class": function() {
      return [ "ui ", Spacebars.mustache(view.lookup("hidden")), " segment" ];
    }
  }, HTML.Raw('\n		<div id="wcloud" class="ui canvas">\n		</div>\n	'));
}));

}).call(this);
