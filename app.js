const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

const people = [
  { first: "Jason", last: "Smith" },
  { first: "Carl", last: "Whitemer" },
  { first: "Carla", last: "Scheenstra" },
  { first: "Garrett", last: "Trott" },
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "pug");

app.get("/", (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render("index", { name });
  } else {
    res.redirect("/hello");
  }
});

app.get("/cards", (req, res) => {
  res.render("card", {
    prompt: "Who is buried in Grant's tomb?",
  });
});

app.get("/hello", (req, res) => {
  res.render("hello");
});

app.post("/hello", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect("/");
});
// sandbox
// first name | last name

app.get("/sandbox", (req, res) => {
  res.render("sandbox", { people });
});

app.listen(3000, () => {
  console.log("the application is running on localhost:3000!");
});
