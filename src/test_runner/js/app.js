var slice = [].slice, get = Ember.get, set = Ember.set;
App = Ember.Application.create();

function renderCard(card) {
  card.renderHeight = 600;
  card.renderWidth = 960;
  card.render();
}

function conduct() {
  var qunit, app, conductor;

  conductor = new Conductor();
  window.conductor = conductor;
  conductor.services.testRunner = Conductor.Oasis.Service.extend({
    initialize: function (port) {
      this.sandbox.testRunnerPort = port;
    },
    events: {
      // events from qunit we pass to pass
      runTest: function (testNum) {
        //app.sandbox.testRunnerPort.send('runTest', testNum);
      },

      // events from app we pass to qunit
      testDone: function (testNum) {
        //qunit.sandbox.testRunnerPort.send('testDone', testNum);
      }
    }
  });

  qunit = conductor.load('qunit_viewer/js/card.js', '1', { capabilities: ['testRunner']});
  app = conductor.load('app/js/card.js', '1', { capabilities: ['testRunner']});

  // bidirectional alernative

  app.sandbox.wiretap(function(capability, message) {
    if(capability !== 'testRunner') { return; }

    console.log('wiretap', message);
    qunit.sandbox.testRunnerPort.send(message.type, message.data);
  });

  app.appendTo('body').then(renderCard);
  qunit.appendTo('body').then(renderCard);
}

App.ApplicationView = Ember.View.extend({
  didInsertElement: conduct /* clearly we don't want this here */
});
