const express = require("express");

const users = require("../users/usersModel.js");

const server = express();

server.use(express.json());


server.get("/", async (req, res) => {
  res.status(200).json({ message: "SANITY CHECK!" });
});


module.exports = server;
