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

// urls required to get list of all planets from SWAPI
const urls = [
  "https://swapi.dev/api/planets/?page=1",
  "https://swapi.dev/api/planets/?page=2",
  "https://swapi.dev/api/planets/?page=3",
  "https://swapi.dev/api/planets/?page=4",
  "https://swapi.dev/api/planets/?page=5",
  "https://swapi.dev/api/planets/?page=6",
];

// collects all fetches to server required to get list of all planets
const promises = urls.map((url) => fetch(url).then((res) => res.json()));

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

    // make all 6 calls to the SWAPI server at once
    await Promise.all(promises)
      .then((results) => {
        // concat each array of planets from response with locally owned array of planets
        results.forEach((page) => (planets = planets.concat(page.results)));
      })
      .then(() => (largestPlanet = getLargestPlanet(planets)))
      .catch((err) => console.error(err));

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

    // make all 6 calls to the SWAPI server at once
    await Promise.all(promises)
      .then((results) => {
        // concat each array of planets from response with locally owned array of planets
        results.forEach((page) => (planets = planets.concat(page.results)));
      })
      .then(() => (mostPopulatedPlanet = getMostPopulatedPlanet(planets)))
      .catch((err) => console.error(err));

    res.status(200).json({ mostPopulatedPlanet });
  } catch (err) {
    res.status(503).json({ message: "Service unavailable" });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
