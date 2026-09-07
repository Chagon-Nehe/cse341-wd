// Import Express
const express = require("express");
const app = express();
const port = 3000;

// Define a route for the home page
app.get("/", (req, res) => {
  res.send("Hello Chawa from Express!");
});

// Define a route for an API or JSON data
app.get("/api/user", (req, res) => {
  res.json({ id: 1, name: "Chawa" });
});

// Start the Express server
app.listen(process.env.port || port, () => {
  console.log(`Express server listening at http://localhost:${process.env.port || port}`);
});
