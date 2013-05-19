App.setupForTesting();
App.injectTestHelpers();

module("App – Acceptance", {
  setup: function(){
    console.log('test setup');
    App.reset();
  }
});

test("the test", function() {
  ok(false, "BRLKASDJ");
});

test("the next test", function() {
  ok(false, "BRLKASDJ");
});
