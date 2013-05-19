Conductor.require('vendor/jquery.js');
Conductor.require('vendor/handlebars.js');
Conductor.require('vendor/ember.js');
Conductor.require('vendor/qunit/qunit.js');
Conductor.require('app/js/app.js');
Conductor.require('app/templates/all.js');
Conductor.require('app/tests/app_tests.js');

Conductor.requireCSS('app/css/style.css');

var card = Conductor.card({
  consumers: {
    testRunner: Conductor.Oasis.Consumer.extend({
      events: {
        runTest: function (testNumber) {
          console.log("App",  "received - testStart", testNumber);
          App.__container__.lookup('controller:application').set('runningTestNumber', testNumber);
        },

        reset: function(){
          QUnit.reset();
        }
      }
    })
  },

  activate: function(a) {

    function sendTo(consumer ,name) {
      return function(message) {
        consumer.send(name, message);
      };
    }

    var testRunner = card.consumers.testRunner;

    QUnit.begin(sendTo(testRunner, 'begin'));
    QUnit.done(sendTo(testRunner, 'done'));
    QUnit.log(sendTo(testRunner, 'log'));
    QUnit.moduleStart(sendTo(testRunner, 'moduleStart'));
    QUnit.moduleDone(sendTo(testRunner, 'moduleDone'));
    QUnit.testDone(sendTo(testRunner, 'testDone'));
    QUnit.testStart(sendTo(testRunner, 'testStart'));

    QUnit.load();
  },

  render: function(){

  }
});

