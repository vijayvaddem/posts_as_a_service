//initialize express
const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");

//create app
const app = express();
app.use(bodyParser.json());
app.use(cors());

//listen on a port
app.listen("4000", () => {
  console.log("listening on 4000");
});

// store data
const posts = {};

//API to get data
app.get("/posts", (req, res) => {
  res.send(posts);
});

//API to post data
app.post("/posts", (req, res) => {
  //generate random id
  const id = randomBytes(4).toString("hex");

  // extract title from req body
  const title = req.body;
  const content = req.content;

  //add to posts array
  posts[id] = {
    id,
    title,
    content,
  };

  res.status("201").send(posts[id]);
});
