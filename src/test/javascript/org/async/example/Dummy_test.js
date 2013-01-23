goog.require('org.async.example.Dummy');

goog.require('goog.async.Deferred');
goog.require('goog.testing.ContinuationTestCase');
goog.require('goog.testing.jsunit');

// By default the timeout of async test is 1000ms. Override it to 1 min.
var original_timeout = goog.testing.ContinuationTestCase.MAX_TIMEOUT;
goog.testing.ContinuationTestCase.MAX_TIMEOUT = 60 * 1000; // prolong default timeout

// Taken from continuationtestcase.js comment
// --------------------------
var testCase = new goog.testing.ContinuationTestCase('Continuation Test Case');
testCase.autoDiscoverTests();

// Standalone Closure Test Runner.
if (typeof G_testRunner != 'undefined') {
    G_testRunner.initialize(testCase);
}
// --------------------------

function testDummy() {

    var deferred = new goog.async.Deferred();
    var dummy = new org.async.example.Dummy(deferred);

    var sampleData = { sample: "data" };

//    dummy
//        .addCallback(function(){
//            if (goog.isDefAndNotNull(console)) {
//                console.log('####> Deferred got the data: ', dummy.getData());
//            }
//        });

    // deferred will get data in 10ms
    setTimeout(
        function(){
            deferred.callback(sampleData)
        }
        , 10);

    assertFalse('Deferred hasn\'t been called yet', dummy.hasFired());

    // wait for deferred until it get the data
    waitForCondition(
        function() {
            return dummy.hasFired();
        },
        function() {
            assertTrue(dummy.hasFired());
            assertEquals('Let\'s check the data', dummy.getData()['sample'], 'data');
        }
    );

//    if (goog.isDefAndNotNull(console)) {
//        console.log('####> Waiting for deferred to get the data...');
//    }

};