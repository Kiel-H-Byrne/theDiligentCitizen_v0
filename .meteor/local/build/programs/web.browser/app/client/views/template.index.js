(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.DIV({
    id: "mainWindow",
    "class": "ui grid"
  }, "\n\n		", HTML.DIV({
    id: "sideBar",
    "class": "ui three wide column"
  }, "\n\n			", Spacebars.include(view.lookupTemplate("ipInfo")), "\n			", Spacebars.include(view.lookupTemplate("legiScanSearch")), "\n\n		"), "\n\n		", HTML.DIV({
    id: "content",
    "class": "ui thirteen wide column"
  }, "\n			", Spacebars.include(view.lookupTemplate("myDistrict")), "\n			\n			", Spacebars.include(view.lookupTemplate("legiScanResults")), "\n\n		"), "\n\n	");
}));
Meteor.startup(Template.body.renderToDocument);

}).call(this);
