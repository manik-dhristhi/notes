const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Notes Route");
});
module.exports = router;
