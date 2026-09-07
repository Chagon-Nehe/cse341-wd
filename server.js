// Import Express
const express = require("express");
const app = express();
const port = 3000;
import { homeRoute, apiRoute } from "./controllers/lesson1.js";

// Define a route for the home page
app.get("/", homeRoute);

// Define a route for an API or JSON data
app.get("/api/user", apiRoute);

// Start the Express server
app.listen(process.env.port || port, () => {
  console.log(`Express server listening at http://localhost:${process.env.port || port}`);
});
