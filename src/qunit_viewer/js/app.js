App = Ember.Application.create();

App.TestSummaryController = Ember.ObjectController.extend({});
App.TestsController = Ember.ArrayController.extend({
  runTest: function(test) {
    alert('running test' + test);
  }
});
