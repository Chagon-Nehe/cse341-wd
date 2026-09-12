// Import Express and mongodb
import mongodb from "mongodb";
import express from "express";
// Import the router from routes/index.js
import router from "./api/routes/index.js";
import { initDB, getDB } from "./connection.js";

//create an instance of the Express application
const app = express();
const port = process.env.PORT || 8080;

// Use the router for all routes
app.use("/", router); 
// Start the server after connecting to MongoDB
initDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });

 
