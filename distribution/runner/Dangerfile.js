"use strict";
/** Creates a Danger context, this provides all of the global functions
 *  which are available to the Danger eval runtime.
 *
 * @param {DangerDSLType} dsl The DSL which is turned into `danger`
 * @returns {DangerContext} a DangerContext-like API
 */
function contextForDanger(dsl) {
    var results = {
        fails: [],
        warnings: [],
        messages: [],
        markdowns: [],
        scheduled: []
    };
    var schedule = function (fn) { return results.scheduled.push(fn); };
    var fail = function (message) { return results.fails.push({ message: message }); };
    var warn = function (message) { return results.warnings.push({ message: message }); };
    var message = function (message) { return results.messages.push({ message: message }); };
    var markdown = function (message) { return results.markdowns.push(message); };
    return {
        schedule: schedule,
        fail: fail,
        warn: warn,
        message: message,
        markdown: markdown,
        console: console,
        results: results,
        danger: dsl
    };
}
exports.contextForDanger = contextForDanger;
//# sourceMappingURL=Dangerfile.js.map