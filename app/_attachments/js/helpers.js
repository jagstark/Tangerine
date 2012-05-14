var Context, MapReduce, Utils;

Backbone.View.prototype.close = function() {
  this.remove();
  this.unbind();
  return typeof this.onClose === "function" ? this.onClose() : void 0;
};

jQuery.fn.topCenter = function() {
  this.css("position", "absolute");
  this.css("top", $(window).scrollTop() + "px");
  return this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
};

jQuery.fn.middleCenter = function() {
  this.css("position", "absolute");
  this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
  return this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
};

jQuery.fn.serializeSubtest = function() {
  var result;
  result = {};
  $.map($(this).serializeArray(), function(element, i) {
    if (result[element.name] != null) {
      if ($.isArray(result[element.name])) {
        return result[element.name].push(element.value);
      } else {
        return result[element.name] = [result[element.name], element.value];
      }
    } else {
      return result[element.name] = element.value;
    }
  });
  return result;
};

MapReduce = (function() {

  function MapReduce() {}

  MapReduce.mapFields = function(doc, req) {
    ({
      concatNodes: function(parent, object) {
        var emitDoc, index, key, prefix, typeofobject, value, _len, _ref, _results, _results2;
        if (object instanceof Array) {
          _results = [];
          for (index = 0, _len = object.length; index < _len; index++) {
            value = object[index];
            if (typeof object !== "string") {
              _results.push(concatNodes(parent + "." + index, value));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        } else {
          typeofobject = typeof object;
          if (typeofobject === "boolean" || typeofobject === "string" || typeofobject === "number") {
            emitDoc = {
              studentID: (_ref = doc.DateTime) != null ? _ref["student-id"] : void 0,
              fieldname: parent
            };
            if (typeofobject === "boolean") {
              emitDoc.result = object ? "true" : "false";
            }
            if (typeofobject === "string" || typeofobject === "number") {
              emitDoc.result = object;
            }
            return emit(doc.assessment, emitDoc);
          } else {
            _results2 = [];
            for (key in object) {
              value = object[key];
              prefix = (parent === "" ? key : parent + "." + key);
              _results2.push(concatNodes(prefix, value));
            }
            return _results2;
          }
        }
      }
    });
    if (!((doc.type != null) && doc.type === "replicationLog")) {
      return concatNodes("", doc);
    }
  };

  MapReduce.reduceFields = function(keys, values, rereduce) {
    var fieldAndResult, key, rv, value;
    rv = [];
    for (key in values) {
      value = values[key];
      fieldAndResult = {};
      fieldAndResult[value.fieldname] = value.result;
      rv.push(fieldAndResult);
    }
    return rv;
  };

  return MapReduce;

})();

Utils = (function() {

  function Utils() {}

  Utils.getValues = function(selector) {
    var values;
    values = {};
    $(selector).find("input, textarea").each(function(index, element) {
      return values[element.id] = element.value;
    });
    return values;
  };

  Utils.cleanURL = function(url) {
    if ((typeof url.indexOf === "function" ? url.indexOf("%") : void 0) !== -1) {
      return url = decodeURIComponent(url);
    } else {
      return url;
    }
  };

  Utils.importAssessmentFromIris = function(dKey) {
    var repOps;
    repOps = {
      'filter': 'tangerine/downloadFilter',
      'create_target': true,
      'query_params': {
        'dKey': dKey
      }
    };
    return $.couch.replicate(Tangerine.iris.host + "/tangerine", "tangerine", {
      success: function(a, b) {
        return console.log([" success", a, b]);
      }
    }, repOps);
  };

  Utils.topAlert = function(alert_text) {
    return $("<div class='disposable_alert'>" + alert_text + "</div>").appendTo("#content").topCenter().delay(2000).fadeOut(250, function() {
      return $(this).remove();
    });
  };

  Utils.midAlert = function(alert_text) {
    return $("<div class='disposable_alert'>" + alert_text + "</div>").appendTo("#content").middleCenter().delay(2000).fadeOut(250, function() {
      return $(this).remove();
    });
  };

  Utils.S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  Utils.guid = function() {
    return this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4();
  };

  return Utils;

})();

Context = (function() {

  function Context() {
    this.mobile = ~(String(window.location).indexOf("iriscouch")) ? false : true;
    this.kindle = /kindle/.test(navigator.userAgent.toLowerCase());
    this.server = ~(String(window.location).indexOf("iriscouch")) ? true : false;
  }

  return Context;

})();

$(function() {
  $("#content").on("click", ".clear_message", null, function(a) {
    return $(a.target).parent().fadeOut(250, function() {
      return $(this).empty().show();
    });
  });
  $("#content").on("click", ".parent_remove", null, function(a) {
    return $(a.target).parent().fadeOut(250, function() {
      return $(this).remove();
    });
  });
  $("#content").on("click", ".alert_button", function() {
    var alert_text;
    alert_text = $(this).attr("data-alert") ? $(this).attr("data-alert") : $(this).val();
    return Utils.disposableAlert(alert_text);
  });
  return $("#content").on("click", ".disposable_alert", function() {
    return $(this).stop().fadeOut(250, function() {
      return $(this).remove();
    });
  });
});
