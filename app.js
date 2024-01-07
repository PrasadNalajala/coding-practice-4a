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

    app.listen(3001, () => console.log("Server started"));
  } catch (e) {
    console.log(`Got an error in ${e.message}`);
  }
};
initializeDb();

app.use(express.json());
//GET API

app.get("/players/", async (request, response) => {
  const query = `
    SELECT *
    FROM cricket_team`;
  const data = await db.all(query);
  // console.log(data);
  response.send(data);
});

app.post("/players/", async (request, response) => {
  try {
    const bookDetails = request.body;
    console.log("book Details" + bookDetails);
    const { playerName, jerseyNumber, role } = bookDetails;

    const query = `
  INSERT INTO cricket_team(playerName,jerseyNumber,role,playerId) VALUES(
      '${playerName}',
      '${jerseyNumber}',
      '${role}',
      
  )
  `;
    const responseItem = await db.run(query);

    response.send("Player Added to Team");
  } catch (e) {
    console.log(`Getting error ${e}`);
  }
});

module.exports = app;
