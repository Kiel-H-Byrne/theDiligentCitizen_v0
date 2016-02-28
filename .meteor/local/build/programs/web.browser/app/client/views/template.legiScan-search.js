(function(){
Template.__checkName("legiScanSearch");
Template["legiScanSearch"] = new Template("Template.legiScanSearch", (function() {
  var view = this;
  return HTML.DIV({
    id: "legiSearch",
    "class": "ui sticky segment"
  }, "\n    ", HTML.FORM({
    id: "legi-search",
    "class": "ui form"
  }, "\n      ", HTML.DIV({
    "class": "field"
  }, "\n        ", HTML.LABEL("Search for an issue in ", Blaze.View("lookup:location", function() {
    return Spacebars.mustache(view.lookup("location"));
  }), ": "), "\n        ", HTML.Raw('<input id="query" name="query" type="text" placeholder="firearms...">'), "\n      "), "\n    "), "\n	");
}));

}).call(this);
