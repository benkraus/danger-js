"use strict";
var providers_1 = require("./providers");
var fs = require("fs");
var path_1 = require("path");
/**
 * Gets a CI Source from the current environment, by asking all known
 * sources if they can be represented in this environment.
 * @param {Env} env The environment.
 * @returns {?CISource} a CI source if it's OK, otherwise Danger can't run.
 */
function getCISourceForEnv(env) {
    var availableProviders = providers_1.providers.slice().map(function (Provider) { return new Provider(env); })
        .filter(function (x) { return x.isCI; });
    return (availableProviders && availableProviders.length > 0) ? availableProviders[0] : undefined;
}
exports.getCISourceForEnv = getCISourceForEnv;
/**
 * Gets a CI Source from externally provided provider module.
 * Module must implement CISource interface, and should export it as default
 * @export
 * @param {Env} env The environment.
 * @param {string} modulePath relative path to CI provider
 * @returns {?CISource} a CI source if module loaded successfully, undefined otherwise
 */
function getCISourceForExternal(env, modulePath) {
    var path = path_1.resolve(process.cwd(), modulePath);
    try {
        var exist = fs.statSync(path).isFile();
        if (exist) {
            var externalModule = require(path); //tslint:disable-line:no-require-imports
            var moduleConstructor = externalModule.default || externalModule;
            return new moduleConstructor(env);
        }
    }
    catch (e) {
        console.error("could not load CI provider at " + modulePath + " due to " + e);
    }
    return undefined;
}
exports.getCISourceForExternal = getCISourceForExternal;
/**
 * Gets a CI Source.
 * @export
 * @param {Env} env The environment.
 * @param {string} modulePath relative path to CI provider
 * @returns {?CISource} a CI source if module loaded successfully, undefined otherwise
 */
function getCISource(env, modulePath) {
    if (modulePath) {
        var external = getCISourceForExternal(env, modulePath);
        if (external) {
            return external;
        }
    }
    return getCISourceForEnv(env);
}
exports.getCISource = getCISource;
//# sourceMappingURL=get_ci_source.js.map