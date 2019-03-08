const express = require("express");

const Users = require("../users/usersModel.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ message: "SANITY CHECK!" });
});

server.post("/", async (req, res) => {
  if (!req.body.name) {
    res
      .status(400)
      .json({
        errorMessage: "Please provide a name."
      });
  } else {
    try {
      const user = await Users.insert(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

server.delete("/:id", async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);

    if (count > 0) {
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The post could not be removed" });
  }
});

module.exports = server;
