// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
const MAX_TABLES = 5;
const waitingList = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Tables (DATA)
// =============================================================
var tables = [
  {
    name: "First Table",
    email: "one@email.com",
    phone: "123-4567",
    uniqueId: "324535"
  },
  {
    name: "Second Table",
    email: "two@email.com",
    phone: "123-4567",
    uniqueId: "9450945"
  },
  {
    name: "Third Table",
    email: "three@email.com",
    phone: "123-4567",
    uniqueId: "04380"
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

app.get("/reservation", function (req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// waiting list
app.get("/api/waitingList", function (req, res) {
  return res.json(waitingList);
});

// reservations
app.get("/api/reservation", function (req, res) {
  return res.json(tables);
});

// post requests
app.post("/api/reservation", function (req, res) {
  const newReservation = req.body;
  if (tables.length < MAX_TABLES) {
    tables.push(newReservation);
    res.json(true);
  } else {
    waitingList.push(newReservation);
    res.json(false);
  }
});