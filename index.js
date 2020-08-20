//initialize express
const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

//create app
const app = express();
app.use(bodyParser.json());
app.use(cors());

//listen on a port
app.listen("4000", () => {
  console.log("listening on 4000");
});

// store data
const documents = {};

//API to get data
app.get("/documents", (req, res) => {
  res.send(documents);
});

//API to post data
app.post("/documents", async (req, res) => {
  //generate random id
  const id = randomBytes(4).toString("hex");

  // extract title from req body
  const title = req.body;
  const content = req.content;

  //add to posts array
  documents[id] = {
    id,
    title,
    content,
  };

  //post to event bus
  await axios.post("http://localhost:4005/events", {
    type: "documentCreated",
    data: {
      id,
      title,
      content,
    },
  });

  res.status("201").send(documents[id]);
});

//post handler for incoming events request
app.post("/event", (req, res) => {
  console.log("Incoming event received for post:", req.body.type);
  res.send({});
});
