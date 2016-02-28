(function(){
Template.__checkName("legiScanResults");
Template["legiScanResults"] = new Template("Template.legiScanResults", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("wordCloud")), "\n  ", HTML.DIV({
    id: "legiResults",
    "class": ""
  }, "\n    ", HTML.Raw("<!-- set the data context -->"), "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("query"));
  }, function() {
    return [ "\n      ", HTML.Comment(" if location has an error property, display it "), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("error"));
    }, function() {
      return [ "\n        ", HTML.P("There was an error:[", Blaze.View("lookup:error.errorType", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("error"), "errorType"));
      }), "] [", Blaze.View("lookup:error.message", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("error"), "message"));
      }), "]!"), "\n      " ];
    }, function() {
      return [ "\n      ", HTML.H3({
        "class": "ui center aligned header segment"
      }, " Bills related to '", Blaze.View("lookup:query", function() {
        return Spacebars.mustache(view.lookup("query"));
      }), "' ... "), "\n      ", HTML.DIV({
        id: "legi-results",
        "class": "ui cards centered"
      }, "\n        ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("queryList"));
      }, function() {
        return [ "\n          ", Blaze.If(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("."), "value", "title"));
        }, function() {
          return [ "\n          ", HTML.DIV({
            "class": "ui card"
          }, "\n            ", HTML.DIV({
            "class": "content"
          }, "\n              ", HTML.DIV({
            "class": "header"
          }, Blaze.View("lookup:..value.state", function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value", "state"));
          }), " - ", Blaze.View("lookup:..value.bill_number", function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value", "bill_number"));
          }), " "), "\n            "), "\n            ", HTML.DIV({
            "class": "content"
          }, "\n              ", HTML.H4({
            "class": "ui sub header"
          }, Blaze.View("lookup:..value.title", function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value", "title"));
          })), "\n              ", HTML.UL({
            "class": "ui bulleted selection list"
          }, "              \n                ", HTML.LI({
            "class": "item"
          }, Blaze.View("lookup:..value.last_action_date", function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value", "last_action_date"));
          }), " | ", Blaze.View("lookup:..value.last_action", function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value", "last_action"));
          })), "\n                ", HTML.LI({
            "class": "item"
          }, HTML.A({
            href: function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value", "text_url"));
            }
          }, "View Text")), "\n                ", HTML.LI({
            "class": "item"
          }, HTML.A({
            href: function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value", "research_url"));
            }
          }, "Research This")), "\n              "), "\n            "), "\n          "), "\n          " ];
        }), "\n        " ];
      }), "\n      "), "\n      " ];
    }), " \n    " ];
  }), "\n  ") ];
}));

}).call(this);
