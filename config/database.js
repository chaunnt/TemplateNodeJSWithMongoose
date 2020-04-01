/**
 * Created by A on 7/18/17.
 */
require("dotenv").config();
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
  { useNewUrlParser: true }
);
console.log(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connected mongodb !!!!");
});

module.exports = {
  mongoose
};
