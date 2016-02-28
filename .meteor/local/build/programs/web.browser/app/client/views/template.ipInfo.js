(function(){
Template.__checkName("ipInfo");
Template["ipInfo"] = new Template("Template.ipInfo", (function() {
  var view = this;
  return HTML.DIV({
    id: "ipInfo",
    "class": "ui segment"
  }, "	\n			", HTML.FORM({
    id: "state-form",
    "class": function() {
      return [ "ui ", Spacebars.mustache(view.lookup("locating")), " form" ];
    }
  }, "\n				", HTML.DIV({
    "class": "field"
  }, "\n					", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("location"), "region"));
  }, function() {
    return [ "\n						", HTML.LABEL(" Not in ", Blaze.View("lookup:location.region", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("location"), "region"));
    }), "? Enter your zipcode here: "), "\n				    ", HTML.INPUT({
      type: "text",
      id: "self-state",
      name: "self-state",
      size: "6",
      placeholder: function() {
        return [ Spacebars.mustache(Spacebars.dot(view.lookup("location"), "postal")), "..." ];
      }
    }), "\n			    " ];
  }, function() {
    return [ "\n						", HTML.LABEL(" Enter your zipcode here: "), "\n				    ", HTML.INPUT({
      type: "text",
      id: "self-state",
      name: "self-state",
      size: "6",
      placeholder: "90210"
    }), "\n			    " ];
  }), "\n			  "), "\n			"), "\n		");
}));

}).call(this);
