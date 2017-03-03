"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var fetch_1 = require("../../api/fetch");
var find = require("lodash.find");
// Note that there are parts of this class which don't seem to be
// used by Danger, they are exposed for Peril support.
/** This represent the GitHub API */
var GitHubAPI = (function () {
    function GitHubAPI(token, ciSource) {
        this.token = token;
        this.ciSource = ciSource;
        // This allows Peril to DI in a new Fetch function
        // which can handle unique API edge-cases around integrations
        this.fetch = fetch_1.api;
        this.additionalHeaders = {};
    }
    /**
     * Grabs the contents of an individual file on GitHub
     *
     * @param {string} path path to the file
     * @param {string} [ref] an optional sha
     * @returns {Promise<string>} text contents
     *
     */
    GitHubAPI.prototype.fileContents = function (path, ref) {
        return __awaiter(this, void 0, void 0, function () {
            var pr, prJSON, fileMetadata, data, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!ref)
                            return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getPullRequestInfo()];
                    case 1:
                        pr = _a.sent();
                        return [4 /*yield*/, pr.json()];
                    case 2:
                        prJSON = _a.sent();
                        ref = prJSON.head.ref;
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.getFileContents(path, ref)];
                    case 4:
                        fileMetadata = _a.sent();
                        return [4 /*yield*/, fileMetadata.json()];
                    case 5:
                        data = _a.sent();
                        buffer = new Buffer(data.content, "base64");
                        return [2 /*return*/, buffer.toString()];
                }
            });
        });
    };
    // The above is the API for Platform
    GitHubAPI.prototype.getDangerCommentID = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userID, allCommentsResponse, allComments, dangerComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserID()];
                    case 1:
                        userID = _a.sent();
                        return [4 /*yield*/, this.getPullRequestComments()];
                    case 2:
                        allCommentsResponse = _a.sent();
                        return [4 /*yield*/, allCommentsResponse.json()];
                    case 3:
                        allComments = _a.sent();
                        dangerComment = find(allComments, function (comment) { return comment.user.id === userID; });
                        return [2 /*return*/, dangerComment ? dangerComment.id : null];
                }
            });
        });
    };
    GitHubAPI.prototype.updateCommentWithID = function (id, comment) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                repo = this.ciSource.repoSlug;
                return [2 /*return*/, this.patch("repos/" + repo + "/issues/comments/" + id, {}, {
                        body: comment
                    })];
            });
        });
    };
    GitHubAPI.prototype.deleteCommentWithID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                repo = this.ciSource.repoSlug;
                return [2 /*return*/, this.api("repos/" + repo + "/issues/comments/" + id, {}, {}, "DELETE")];
            });
        });
    };
    GitHubAPI.prototype.getUserID = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserInfo()];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/, info.id];
                }
            });
        });
    };
    GitHubAPI.prototype.postPRComment = function (comment) {
        var repo = this.ciSource.repoSlug;
        var prID = this.ciSource.pullRequestID;
        return this.post("repos/" + repo + "/issues/" + prID + "/comments", {}, {
            body: comment
        });
    };
    GitHubAPI.prototype.getPullRequestInfo = function () {
        var repo = this.ciSource.repoSlug;
        var prID = this.ciSource.pullRequestID;
        return this.get("repos/" + repo + "/pulls/" + prID);
    };
    GitHubAPI.prototype.getPullRequestCommits = function () {
        var repo = this.ciSource.repoSlug;
        var prID = this.ciSource.pullRequestID;
        return this.get("repos/" + repo + "/pulls/" + prID + "/commits");
    };
    GitHubAPI.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get("user")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // TODO: This does not handle pagination
    GitHubAPI.prototype.getPullRequestComments = function () {
        var repo = this.ciSource.repoSlug;
        var prID = this.ciSource.pullRequestID;
        return this.get("repos/" + repo + "/issues/" + prID + "/comments");
    };
    GitHubAPI.prototype.getPullRequestDiff = function () {
        var repo = this.ciSource.repoSlug;
        var prID = this.ciSource.pullRequestID;
        return this.get("repos/" + repo + "/pulls/" + prID, {
            accept: "application/vnd.github.v3.diff"
        });
    };
    GitHubAPI.prototype.getFileContents = function (path, ref) {
        var repo = this.ciSource.repoSlug;
        return this.get("repos/" + repo + "/contents/" + path + "?ref=" + ref, {});
    };
    GitHubAPI.prototype.getPullRequests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repo, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = this.ciSource.repoSlug;
                        return [4 /*yield*/, this.get("repos/" + repo + "/pulls")];
                    case 1:
                        res = _a.sent();
                        if (res.ok) {
                            return [2 /*return*/, res.json()];
                        }
                        return [2 /*return*/, []];
                }
            });
        });
    };
    GitHubAPI.prototype.api = function (path, headers, body, method) {
        if (headers === void 0) { headers = {}; }
        if (body === void 0) { body = {}; }
        if (this.token !== undefined) {
            headers["Authorization"] = "token " + this.token;
        }
        return this.fetch("https://api.github.com/" + path, {
            method: method,
            body: body,
            headers: __assign({ "Content-Type": "application/json" }, headers, this.additionalHeaders)
        });
    };
    GitHubAPI.prototype.get = function (path, headers, body) {
        if (headers === void 0) { headers = {}; }
        if (body === void 0) { body = {}; }
        return this.api(path, headers, body, "GET");
    };
    GitHubAPI.prototype.post = function (path, headers, body) {
        if (headers === void 0) { headers = {}; }
        if (body === void 0) { body = {}; }
        return this.api(path, headers, JSON.stringify(body), "POST");
    };
    GitHubAPI.prototype.patch = function (path, headers, body) {
        if (headers === void 0) { headers = {}; }
        if (body === void 0) { body = {}; }
        return this.api(path, headers, JSON.stringify(body), "PATCH");
    };
    return GitHubAPI;
}());
exports.GitHubAPI = GitHubAPI;
//# sourceMappingURL=GitHubAPI.js.map