"use strict";
// run 'tsc index.ts' to compile to js
// run 'npm start' to run latest index.js javascript file
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.__esModule = true;
var express = require("express");
var path = require("path");
var cross_fetch_1 = require("cross-fetch");
var services_1 = require("./services");
var app = express();
var port = 3000;
app.use(express.static(path.join(__dirname + "/public")));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html", function (err) {
        if (err)
            throw err;
    });
});
// urls required to get list of all planets from SWAPI
var urls = [
    "https://swapi.dev/api/planets/?page=1",
    "https://swapi.dev/api/planets/?page=2",
    "https://swapi.dev/api/planets/?page=3",
    "https://swapi.dev/api/planets/?page=4",
    "https://swapi.dev/api/planets/?page=5",
    "https://swapi.dev/api/planets/?page=6",
];
// collects all fetches to server required to get list of all planets
var promises = urls.map(function (url) { return (0, cross_fetch_1["default"])(url).then(function (res) { return res.json(); }); });
/**
 * Retrieves a list of total planets available from the Star Wars API
 * https://swapi.dev/documentation
 * From that list, find the largest diameter and filter planet(s) with that diameter from the list
 */
app.get("/largest-planet", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets_1, largestPlanet_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                planets_1 = [];
                // make all 6 calls to the SWAPI server at once
                return [4 /*yield*/, Promise.all(promises)
                        .then(function (results) {
                        // concat each array of planets from response with locally owned array of planets
                        results.forEach(function (page) { return (planets_1 = planets_1.concat(page.results)); });
                    })
                        .then(function () { return (largestPlanet_1 = (0, services_1.getLargestPlanet)(planets_1)); })["catch"](function (err) { return console.error(err); })];
            case 1:
                // make all 6 calls to the SWAPI server at once
                _a.sent();
                res.status(200).json({ largestPlanet: largestPlanet_1 });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(503).json({ message: "Service unavailable" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Retrieves a list of total planets available from the Star Wars API
 * https://swapi.dev/documentation
 * From that list, filter out all planets with a known population
 * Find largest population among those planets and return planet(s) with that population
 */
app.get("/most-populated", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets_2, mostPopulatedPlanet_1, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                planets_2 = [];
                // make all 6 calls to the SWAPI server at once
                return [4 /*yield*/, Promise.all(promises)
                        .then(function (results) {
                        // concat each array of planets from response with locally owned array of planets
                        results.forEach(function (page) { return (planets_2 = planets_2.concat(page.results)); });
                    })
                        .then(function () { return (mostPopulatedPlanet_1 = (0, services_1.getMostPopulatedPlanet)(planets_2)); })["catch"](function (err) { return console.error(err); })];
            case 1:
                // make all 6 calls to the SWAPI server at once
                _a.sent();
                res.status(200).json({ mostPopulatedPlanet: mostPopulatedPlanet_1 });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(503).json({ message: "Service unavailable" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("App listening on port " + port);
});
