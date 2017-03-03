"use strict";
var Travis_1 = require("./Travis");
var Circle_1 = require("./Circle");
var Semaphore_1 = require("./Semaphore");
var Jenkins_1 = require("./Jenkins");
var Fake_1 = require("./Fake");
var Surf_1 = require("./Surf");
var DockerCloud_1 = require("./DockerCloud");
var Codeship_1 = require("./Codeship");
var providers = [Travis_1.Travis, Circle_1.Circle, Semaphore_1.Semaphore, Jenkins_1.Jenkins, Fake_1.FakeCI, Surf_1.Surf, DockerCloud_1.DockerCloud, Codeship_1.Codeship];
exports.providers = providers;
//# sourceMappingURL=index.js.map