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
var repl = require("repl");
var jsome = require("jsome");
var Fake_1 = require("../ci_source/providers/Fake");
var GitHub_1 = require("../platforms/GitHub");
var GitHubAPI_1 = require("../platforms/github/GitHubAPI");
var Executor_1 = require("../runner/Executor");
var pullRequestParser_1 = require("../platforms/github/pullRequestParser");
var DangerfileRunner_1 = require("../runner/DangerfileRunner");
var d = debug("danger:pr");
program
    .option("-d, --dangerfile [filePath]", "Specify custom dangerfile other than default dangerfile.js")
    .option("-r, --repl", "Drop into a Node REPL after evaluating the dangerfile")
    .parse(process.argv);
var dangerFile = program.dangerfile || "dangerfile.js";
if (program.args.length === 0) {
    console.error("Please include a PR URL to run against");
    process.exitCode = 1;
}
else {
    var pr = pullRequestParser_1.pullRequestParser(program.args[0]);
    if (!pr) {
        console.error("Could not get a repo and a PR number from your URL, bad copy & paste?");
        process.exitCode = 1;
    }
    else {
        // TODO: Use custom `fetch` in GitHub that stores and uses local cache if PR is closed, these PRs
        //       shouldn't change often and there is a limit on API calls per hour.
        if (validateDangerfileExists(dangerFile)) {
            d("executing dangerfile at " + dangerFile);
            var source = new Fake_1.FakeCI({ DANGER_TEST_REPO: pr.repo, DANGER_TEST_PR: pr.pullRequestNumber });
            var api = new GitHubAPI_1.GitHubAPI(process.env["DANGER_GITHUB_API_TOKEN"], source);
            var platform = new GitHub_1.GitHub(api);
            runDanger(source, platform, dangerFile);
        }
    }
}
function validateDangerfileExists(filePath) {
    var stat = null;
    try {
        stat = fs.statSync(filePath);
    }
    catch (error) {
        console.error("Could not find a dangerfile at " + filePath + ", not running against your PR.");
        process.exitCode = 1;
    }
    if (!!stat && !stat.isFile()) {
        console.error("The resource at " + filePath + " appears to not be a file, not running against your PR.");
        process.exitCode = 1;
    }
    return !!stat && stat.isFile();
}
function runDanger(source, platform, file) {
    return __awaiter(this, void 0, void 0, function () {
        var exec, runtimeEnv, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exec = new Executor_1.Executor(source, platform);
                    return [4 /*yield*/, exec.setupDanger()];
                case 1:
                    runtimeEnv = _a.sent();
                    return [4 /*yield*/, DangerfileRunner_1.runDangerfileEnvironment(file, runtimeEnv)];
                case 2:
                    results = _a.sent();
                    if (program["repl"]) {
                        openRepl(runtimeEnv.context);
                    }
                    else {
                        jsome(results);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function openRepl(dangerContext) {
    /**
     * Injects a read-only, global variable into the REPL
     *
     * @param {repl.REPLServer} repl The Node REPL created via `repl.start()`
     * @param {string} name The name of the global variable
     * @param {*} value The value of the global variable
     */
    function injectReadOnlyProperty(repl, name, value) {
        Object.defineProperty(repl["context"], name, {
            configurable: false,
            enumerable: true,
            value: value
        });
    }
    /**
     * Sets up the Danger REPL with `danger` and `results` global variables
     *
     * @param {repl.REPLServer} repl The Node REPL created via `repl.start()`
     */
    function setup(repl) {
        injectReadOnlyProperty(repl, "danger", dangerContext.danger);
        injectReadOnlyProperty(repl, "results", dangerContext.results);
    }
    var dangerRepl = repl.start({ prompt: "> " });
    setup(dangerRepl);
    dangerRepl.on("exit", function () { return process.exit(); });
    // Called when `.clear` is executed in the Node REPL
    // This ensures that `danger` and `results` are not cleared from the REPL context
    dangerRepl.on("reset", function () { return setup(dangerRepl); });
}
//# sourceMappingURL=danger-pr.js.map