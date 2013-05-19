Conductor.require('vendor/jquery.js');
Conductor.require('vendor/handlebars.js');
Conductor.require('vendor/ember.js');
Conductor.require('qunit_viewer/js/app.js');
Conductor.require('qunit_viewer/templates/all.js');
Conductor.requireCSS('vendor/qunit/qunit.css');

function lookup(fullName){
  return App.__container__.lookup(fullName);
}

function controllerFor(controllerName){
  return lookup('controller:' + controllerName);
}

var card = Conductor.card({
  consumers: {
    testRunner: Conductor.Oasis.Consumer.extend({
      events: {
        done: function (testDetails) {
          var object = Ember.Object.create(testDetails);
          controllerFor('test_summary').set('content', object);
        },

        log: function(data) {
          var object = Ember.Object.create(data);
          controllerFor('tests').addObject(object);
        },
        testDone: function(testDetails) {

        }
      }
    })
  },

  activate: function() {

  },

  render: function() {

  }
});
