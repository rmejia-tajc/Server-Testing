const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  remove
};

async function insert(user) {
  const [id] = await db("users").insert(user); //add 'id' (user, 'id') for postgress/other platforms. It will create harmless warnings in the terminal!

  return db("users")
    .where({ id })
    .first();
}

function remove(id) {
  return db("users")
    .where("id", Number(id))
    .del();
}