(function(){
Template.__checkName("myDistrict");
Template["myDistrict"] = new Template("Template.myDistrict", (function() {
  var view = this;
  return HTML.DIV({
    id: "legislators",
    "class": "ui"
  }, "\n		", HTML.H3({
    "class": "ui center aligned header segment"
  }, " Representatives for ", Blaze.View("lookup:location.postal", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("location"), "postal"));
  }), ", ", Blaze.View("lookup:location.state", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("location"), "state"));
  }), "."), "\n\n		", HTML.DIV({
    "class": "ui cards centered"
  }, "\n			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("legislators"));
  }, function() {
    return [ "\n			", HTML.DIV({
      "class": function() {
        return [ "ui ", Spacebars.mustache(view.lookup("party_color")), " card" ];
      }
    }, "\n\n				", HTML.DIV({
      "class": "ui image"
    }, "\n					", HTML.IMG({
      "class": "ui image",
      src: function() {
        return [ "https://theunitedstates.io/images/congress/225x275/", Spacebars.mustache(Spacebars.dot(view.lookup("."), "bioguide_id")), ".jpg" ];
      }
    }), "\n				"), "\n\n				", HTML.DIV({
      "class": "content"
    }, "\n					", HTML.A({
      "class": "ui tiny header",
      href: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "website"));
      }
    }, Blaze.View("lookup:..first_name", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "first_name"));
    }), " ", Blaze.View("lookup:..last_name", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "last_name"));
    }), " ", Blaze.View("lookup:..name_suffix", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name_suffix"));
    }), " (", Blaze.View("lookup:..party", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "party"));
    }), ")"), "\n					\n					", HTML.DIV({
      "class": "meta"
    }, "\n						", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "district"));
    }, function() {
      return [ "\n							", HTML.A("District ", Blaze.View("lookup:..district", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "district"));
      }), ", "), " \n						" ];
    }), "\n						", HTML.A(Blaze.View("lookup:..chamber", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "chamber"));
    })), " \n						", HTML.A(HTML.SPAN({
      "class": "date"
    }, "(", Blaze.View("lookup:..term_start", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "term_start"));
    }))), "-", HTML.A(HTML.SPAN({
      "class": "date"
    }, Blaze.View("lookup:..term_end", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "term_end"));
    }), ")")), "\n						"), "\n						", HTML.P(Blaze.View("lookup:..office", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "office"));
    }), " \n							", HTML.BR(), "\n							", Blaze.View("lookup:..phone", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "phone"));
    }), "\n						"), "\n					"), "\n\n				", HTML.DIV({
      id: "social",
      "class": "ui center aligned extra content"
    }, "\n					", HTML.A({
      href: function() {
        return [ "mailto:", Spacebars.mustache(Spacebars.dot(view.lookup("."), "oc_email")) ];
      }
    }, " \n						", HTML.I({
      "class": "inbox large icon"
    }), "\n					"), "					\n					", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "facebook_id"));
    }, function() {
      return [ "\n						", HTML.A({
        href: function() {
          return [ "http://www.facebook.com/", Spacebars.mustache(Spacebars.dot(view.lookup("."), "facebook_id")) ];
        }
      }, " \n							", HTML.I({
        "class": "facebook  large icon"
      }), "\n						"), "\n					" ];
    }), "\n					", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "twitter_id"));
    }, function() {
      return [ "\n						", HTML.A({
        href: function() {
          return [ "http://www.twitter.com/", Spacebars.mustache(Spacebars.dot(view.lookup("."), "twitter_id")) ];
        }
      }, "\n							", HTML.I({
        "class": "ui twitter  large icon"
      }), "\n						"), "\n					" ];
    }), "\n					", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "youtube_id"));
    }, function() {
      return [ "\n						", HTML.A({
        href: function() {
          return [ "http://www.youtube.com/", Spacebars.mustache(Spacebars.dot(view.lookup("."), "youtube_id")) ];
        }
      }, "\n							", HTML.I({
        "class": "ui youtube  large icon"
      }), "\n						"), "\n					" ];
    }), "\n				"), "\n\n				", HTML.A({
      "class": "ui bottom attached button",
      href: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "contact_form"));
      }
    }, "Contact"), "\n\n			"), "\n			" ];
  }), "\n		"), "\n	");
}));

}).call(this);
