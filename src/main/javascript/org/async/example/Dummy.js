goog.provide('org.async.example.Dummy');

goog.require('goog.object');
goog.require('goog.async.Deferred');

/**
 * Constructor.
 * @param {!goog.async.Deferred} deferred
 * @param {Function=} opt_canceller A function that will be called if the
 *     deferred is cancelled.
 * @param {Object=} opt_defaultScope The default scope to call callbacks with.
 * @constructor
 * @extends {goog.async.Deferred}
 */
org.async.example.Dummy = function(deferred, opt_canceller, opt_defaultScope) {

    goog.async.Deferred.call(this, opt_canceller, opt_defaultScope);

    /**
     * @type {!goog.async.Deferred}
     * @private
     */
    this.deferred_ = deferred;

    /**
     * @type {*}
     * @private
     */
    this.data_ = null;

    // when deferred has the results, keep them in map and let the callee know.
    this.deferred_.addCallback(function(data){
        this.data_ = data;
        this.callback();
    }, this);
};
goog.inherits(org.async.example.Dummy, goog.async.Deferred);

/**
 * Return data.
 * @return {*}
 */
org.async.example.Dummy.prototype.getData = function() {
    return this.data_;
};