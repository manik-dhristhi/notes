const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserById } = require("../controllers/User");

router.get("/", (req, res) => {
  res.send("User Route");
});
router.post("/create", createUser);
router.get("/getuser", getUsers);
router.get("/getuser/:id", getUserById);
module.exports = router;
