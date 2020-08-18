//initialize express
const express = require("express");

//create app
const app = express();

//listen on a port
app.listen("4000", () => {
  console.log("listening on 4000");
});

//build apis
app.get("/posts", (req, res) => {});
app.post("/posts", (req, res) => {});
