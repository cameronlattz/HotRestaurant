// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Tables (DATA)
// =============================================================
var tables = [
  {
    routeName: "table1",
    name: "First Table",
    peopleCount: 3,
    waitTime: 30,
  },
  {
    routeName: "table2",
    name: "Second Table",
    peopleCount: 6,
    waitTime: 45,
  },
  {
    routeName: "table3",
    name: "Third Table",
    peopleCount: 2,
    waitTime: 20,
  }
];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/add", function (req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all tables
app.get("/api/tables", function (req, res) {
  return res.json(tables);
});

// Displays a single character, or returns false
app.get("/api/tables/:character", function (req, res) {
  const chosen = req.params.character;

  console.log(chosen);

  for (const i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

// Create New tables - takes in JSON input
app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newCharacter = req.body;
  console.log("newCharacter", newCharacter)

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newCharacter);

  tables.push(newCharacter);

  res.json(newCharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

// Adds Routes to home reserver, 

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/table", function (req, res) {
  res.sendFile(path.join(__dirname, "table.html"));
});

// waiting list

app.get("/api/waitingList", function (req, res) {
  return res.json(tables);
});

// reservations

app.get("/api/reservations", function (req, res) {
  return res.json(reservations);
});


// post requests

app.post("/api/reservations", function (req, res) {

      const newReservation = req.body;

      console.log(newReservation);

      tables.push(newReservation);

      res.json(newReservation);
      });

      

