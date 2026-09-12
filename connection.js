// db.js
// Handles the MongoDB connection lifecycle for the app.

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client;
let db;

/**
 * Initializes the MongoDB connection and caches the Db instance.
 * Safe to call multiple times — subsequent calls return the cached db.
 */
async function initDB(callback) {
  if (db) {
    console.warn("Database is already initialized!");
    return db;
  }

  // Include the database name in the URI itself, e.g.:
  // mongodb+srv://user:pass@cluster.mongodb.net/myDatabaseName?retryWrites=true
    const url = process.env.MONGODB_URL;

  client = new MongoClient(url);

  try {
    await client.connect();
    db = client.db(); // no argument needed — Mongo reads the name from the URI
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // rethrow so callers know initialization failed
  }
}

/**
 * Returns the cached Db instance. Throws if initDB() hasn't run yet.
 */
function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call initDB first.");
  }
  return db;
}

/**
 * Optional: close the connection cleanly, e.g. on process shutdown (SIGINT/SIGTERM).
 */
async function closeDB() {
  if (client) {
    await client.close();
    db = undefined;
    console.log("MongoDB connection closed");
  }
}

export { initDB, getDB, closeDB };
