"use strict";
/*
 *   File contains business logic needed for determining responses for routes
 */
exports.__esModule = true;
exports.getMostPopulatedPlanet = exports.getLargestPlanet = void 0;
/**
 * Using passed array of planets, find the largest diameter and filter planet(s) with that diameter from the list
 */
function getLargestPlanet(planets) {
    var planetsWithDiameter = planets.filter(function (planet) { return planet.diameter !== "unknown"; });
    // filter out planet(s) with largest diameter
    return planetsWithDiameter.filter(function (planet) {
        return planet.diameter == Math.max.apply(Math, planetsWithDiameter.map(function (planet) { return parseInt(planet.diameter); }) // ensure diameter is a number and not a string
        );
    });
}
exports.getLargestPlanet = getLargestPlanet;
/**
 * Using passed array of planets, filter out all planets with a known population
 * Find largest population among those planets and return planet(s) with that population
 */
function getMostPopulatedPlanet(planets) {
    // create new array of planets with known population
    var populatedPlanets = planets.filter(function (planet) { return planet.population !== "unknown"; });
    // filter out planet(s) with largest known population
    return populatedPlanets.filter(function (planet) {
        return planet.population == Math.max.apply(Math, populatedPlanets.map(function (planet) { return parseInt(planet.population); }) // ensure population is a number and not a string
        );
    });
}
exports.getMostPopulatedPlanet = getMostPopulatedPlanet;
