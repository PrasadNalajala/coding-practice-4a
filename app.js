const express = require("express");
const app = express();

const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "/cricketTeam.db");
let db = null;
const initializeDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => console.log("Server started"));
  } catch (e) {
    console.log(`Got an error in ${e.message}`);
  }
};
initializeDb();

//GET API

app.get("/players/", async (request, response) => {
  const query = `
    SELECT *
    FROM cricket_team`;
  const data = await db.all(query);
  console.log(data);
  response.send(data);
});

module.exports = app;
