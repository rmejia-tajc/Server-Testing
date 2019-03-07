const db = require("../data/dbConfig.js");
const Users = require("./usersModel.js");

describe("users model", () => {
  afterEach(async () => {
    await db("users").truncate();
  }); // clean up the database so each test can be unaffected by the previous test. Can be moved up to clean up after all tests or down to clean up after certain test(s)!

  describe("insert()", () => {

    it("should insert(create) the new user into the database", async () => {

      let users = await db("users");
      expect(users).toHaveLength(0);

      await Users.insert({ name: "test" });

      users = await db("users");
      expect(users).toHaveLength(1);
    });

    it("should insert(create) the new users into the database", async () => {

      await Users.insert({ name: "test1" });
      await Users.insert({ name: "test2" });
      await Users.insert({ name: "test3" });
      await Users.insert({ name: "test4" });
      await Users.insert({ name: "test5" });
      await Users.insert({ name: "test6" });

      const users = await db("users");
      expect(users).toHaveLength(6);
    });

    it("should insert(create) the new user into the database", async () => {

      let user = await Users.insert({ name: "test1" });
      expect(user.name).toBe("test1");

      user = await Users.insert({ name: "test2" });
      expect(user.name).toBe("test2");

      user = await Users.insert({ name: "test3" });
      expect(user.name).toBe("test3");
    });

    it("should remove(delete) the user from the database", async () => {

      await Users.insert({ name: "test1" });

      let users = await db("users");
      expect(users).toHaveLength(1);

      await Users.remove(1);

      users = await db("users");
      expect(users).toHaveLength(0);
    });

    it("should remove(delete) the users from the database", async () => {

      await Users.insert({ name: "test1" });
      await Users.insert({ name: "test2" });
      await Users.insert({ name: "test3" });
      await Users.insert({ name: "test4" });
      await Users.insert({ name: "test5" });
      await Users.insert({ name: "test6" });
      await Users.remove(1);
      await Users.remove(3);
      await Users.remove(5);

      const users = await db("users");
      expect(users).toHaveLength(3);
    });
  });
});
