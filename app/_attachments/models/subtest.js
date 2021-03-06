var Subtest, SubtestCollection,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Subtest = (function(_super) {

  __extends(Subtest, _super);

  function Subtest() {
    Subtest.__super__.constructor.apply(this, arguments);
  }

  Subtest.prototype.url = "/subtest";

  return Subtest;

})(Backbone.Model);

SubtestCollection = (function(_super) {

  __extends(SubtestCollection, _super);

  function SubtestCollection() {
    SubtestCollection.__super__.constructor.apply(this, arguments);
  }

  SubtestCollection.prototype.model = Subtest;

  SubtestCollection.prototype.url = "/subtest";

  return SubtestCollection;

})(Backbone.Collection);
