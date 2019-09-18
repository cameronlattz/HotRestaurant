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

// Displays all tables
app.get("/api/tables", function (req, res) {
  return res.json(tables);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
// Routes
// =============================================================
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
app.get("/api/reservation", function (req, res) {
  return res.json(tables);
});

// post requests
app.post("/api/reservation", function (req, res) {
  const newReservation = req.body;
  console.log(newReservation);
  tables.push(newReservation);
  res.json(tables);
});