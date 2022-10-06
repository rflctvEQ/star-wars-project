// run 'tsc index.ts' to compile to js
// run 'npm start' to run latest index.js javascript file

import * as express from "express";
import * as path from "path";
import fetch from "cross-fetch";
import { getLargestPlanet, getMostPopulatedPlanet, Planet } from "./services";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html", (err) => {
    if (err) throw err;
  });
});

/**
 * Retrieves a list of total planets available from the Star Wars API
 * https://swapi.dev/documentation
 * From that list, find the largest diameter and filter planet(s) with that diameter from the list
 */
app.get("/largest-planet", async (req, res) => {
  try {
    // array of all planets concatenated after each call for new planets
    let planets = [];

    // variable that will eventually be sent in response to client
    let largestPlanet: Planet;

    const getAllPlanets = async () => {
      // TODO: make this modular instead of hardcoding the API calls
      for (let i = 1; i < 7; i++) {
        // get each page of planets and concat with planets array
        await fetch(`https://swapi.dev/api/planets/?page=${i}`)
          .then((res) => res.json())
          .then((response) => {
            planets = planets.concat(response.results);
          });
      }

      // method from services returns largest planet from list of planets
      largestPlanet = getLargestPlanet(planets);
    };

    await getAllPlanets();

    res.status(200).json({ largestPlanet });
  } catch (err) {
    res.status(503).json({ message: "Service unavailable" });
  }
});

/**
 * Retrieves a list of total planets available from the Star Wars API
 * https://swapi.dev/documentation
 * From that list, filter out all planets with a known population
 * Find largest population among those planets and return planet(s) with that population
 */
app.get("/most-populated", async (req, res) => {
  try {
    // array of all planets concatenated after each call for new planets
    let planets = [];

    // variable that will eventually be sent in response to client
    let mostPopulatedPlanet: Planet;

    const getAllPlanets = async () => {
      // TODO: make this modular instead of harding the API calls
      for (let i = 1; i < 7; i++) {
        // get each page of planets and concat with planets array
        await fetch(`https://swapi.dev/api/planets/?page=${i}`)
          .then((res) => res.json())
          .then((response) => {
            planets = planets.concat(response.results);
          });
      }

      // method from services returns highest populated planet from list of planets
      mostPopulatedPlanet = getMostPopulatedPlanet(planets);
    };

    await getAllPlanets();

    res.status(200).json({ mostPopulatedPlanet });
  } catch (err) {
    res.status(503).json({ message: "Service unavailable" });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
