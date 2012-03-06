var LoginView;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
LoginView = (function() {
  __extends(LoginView, Backbone.View);
  function LoginView() {
    this.render = __bind(this.render, this);
    LoginView.__super__.constructor.apply(this, arguments);
  }
  LoginView.prototype.initialize = function() {};
  LoginView.prototype.el = $('#content');
  LoginView.prototype.render = function() {
    return this.el.html("      <form id='login-form'>        <label for='name'>Enumerator Name</label>        <input id='name' name='name'></input>        <label for='password'>Password</label>        <input id='password' type='password' name='password'></input>        <div id='message'></div>        <input type='submit' value='Login'></input>      </form>    ");
  };
  LoginView.prototype.events = {
    "submit form#login-form": "login"
  };
  LoginView.prototype.login = function(event) {
    var name, password;
    name = $('#name').val();
    password = $('#password').val();
    $.couch.login({
      name: name,
      password: password,
      success: function() {
        $('#enumerator').html(name);
        $.enumerator = name;
        return Tangerine.router.navigate(Tangerine.router.targetroute, true);
      },
      error: function(status, error, reason) {
        $("#message").html("Creating new user");
        return $.couch.signup({
          name: name
        }, password, {
          success: function() {
            return $.couch.login({
              name: name,
              password: password,
              success: function() {
                $('#current-name').html(name);
                return Tangerine.router.navigate(Tangerine.router.targetroute, true);
              }
            });
          },
          error: function(status, error, reason) {
            if (error === "conflict") {
              return $("#message").html("Either you have the wrong password or '" + ($('#name').val()) + "' has already been used as a valid name. Please try again.");
            } else {
              return $("#message").html("" + error + ": " + reason);
            }
          }
        });
      }
    });
    return false;
  };
  return LoginView;
})();