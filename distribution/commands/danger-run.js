"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var program = require("commander");
var debug = require("debug");
var fs = require("fs");
var get_ci_source_1 = require("../ci_source/get_ci_source");
var platform_1 = require("../platforms/platform");
var Executor_1 = require("../runner/Executor");
var d = debug("danger:run");
// TODO: if we get more options around the dangerfile, we should
//       support sharing `program` setup code with danger-pr.ts
program
    .option("-v, --verbose", "Verbose output of files")
    .option("-c, --external-ci-provider [modulePath]", "Specify custom CI provider")
    .option("-d, --dangerfile [filePath]", "Specify custom dangefile other than default dangerfile.js")
    .parse(process.argv);
process.on("unhandledRejection", function (reason, _p) {
    console.log("Error: ", reason);
    process.exitCode = 1;
});
if (process.env["DANGER_VERBOSE"] || program.verbose) {
    global.verbose = true;
}
// a dirty wrapper to allow async functionality in the setup
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var source, platform, dangerFile, stat, exec;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    source = get_ci_source_1.getCISource(process.env, program.externalCiProvider || undefined);
                    if (!source) {
                        console.log("Could not find a CI source for this run");
                        // Check for ENV["CI"] and wanr they might want a local command instead?
                        process.exitCode = 1;
                    }
                    if (!(source && source.setup))
                        return [3 /*break*/, 2];
                    return [4 /*yield*/, source.setup()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (source && !source.isPR) {
                        console.log("Skipping due to not being a PR");
                    }
                    if (source && source.isPR) {
                        platform = platform_1.getPlatformForEnv(process.env, source);
                        if (!platform) {
                            console.log("Could not find a source code hosting platform for " + source.name);
                            process.exitCode = 1;
                        }
                        if (platform) {
                            dangerFile = program.dangerfile || "dangerfile.js";
                            console.log("OK, looks good " + source.name + " on " + platform.name);
                            try {
                                stat = fs.statSync(dangerFile);
                                if (!!stat && stat.isFile()) {
                                    d("executing dangerfile at " + dangerFile);
                                    exec = new Executor_1.Executor(source, platform);
                                    exec.setupAndRunDanger(dangerFile);
                                }
                                else {
                                    console.log("looks like specified " + dangerFile + " is not valid path");
                                    process.exitCode = 1;
                                }
                            }
                            catch (error) {
                                process.exitCode = 1;
                                console.error(error.message);
                                console.error(error);
                            }
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
run();
//# sourceMappingURL=danger-run.js.map