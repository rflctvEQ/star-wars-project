/*
 *   File contains business logic needed for determining responses for routes
 */

/**
 * Using passed array of planets, find the largest diameter and filter planet(s) with that diameter from the list
 */
export function getLargestPlanet(planets): Planet {
  const planetsWithDiameter = planets.filter(
    (planet) => planet.diameter !== "unknown"
  );

  // filter out planet(s) with largest diameter
  return planetsWithDiameter.filter(
    (planet) =>
      planet.diameter ==
      // finds the largest diameter from a list of all diameter values
      Math.max(
        ...planetsWithDiameter.map((planet) => parseInt(planet.diameter)) // ensure diameter is a number and not a string
      )
  );
}

/**
 * Using passed array of planets, filter out all planets with a known population
 * Find largest population among those planets and return planet(s) with that population
 */
export function getMostPopulatedPlanet(planets): Planet {
  // create new array of planets with known population
  const populatedPlanets = planets.filter(
    (planet) => planet.population !== "unknown"
  );

  // filter out planet(s) with largest known population
  return populatedPlanets.filter(
    (planet) =>
      planet.population ==
      // finds the largest population from a list of all population values
      Math.max(
        ...populatedPlanets.map((planet) => parseInt(planet.population)) // ensure population is a number and not a string
      )
  );
}

export interface Planet {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}
