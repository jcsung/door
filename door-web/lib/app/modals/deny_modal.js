// Generated by CoffeeScript 1.7.1
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function() {
  return this.deny_modal = (function(_super) {
    __extends(deny_modal, _super);

    function deny_modal() {
      this.ok = __bind(this.ok, this);
      this.render = __bind(this.render, this);
      return deny_modal.__super__.constructor.apply(this, arguments);
    }

    deny_modal.prototype.el = "#deny-modal";

    deny_modal.prototype.events = {
      "click #btn-ok": "ok"
    };

    deny_modal.prototype.initialize = function(opts) {
      this.$okBtn = this.$el.find("#btn-ok");
      return $(document).on("keyup checkout", (function(_this) {
        return function(e) {
          if (e.keyCode === 13) {
            e.preventDefault();
            _this.ok();
          }
          if (e.keyCode === 27) {
            e.preventDefault();
            return _this.cancel();
          }
        };
      })(this));
    };

    deny_modal.prototype.render = function(e) {
      this.$el.modal();
      return this;
    };

    deny_modal.prototype.ok = function() {
      return this.cleanup();
    };

    deny_modal.prototype.cleanup = function() {
      $(document).off("keyup checkout");
      this.$el.off("click", "#btn-ok");
      return this.$el.modal("hide");
    };

    return deny_modal;

  })(Backbone.View);
});
