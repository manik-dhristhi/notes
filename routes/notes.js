const express = require("express");
const router = express.Router();
const { createNotes, getNotes, getNotesById } = require("../controllers/Notes");

router.get("/", (req, res) => {
  res.send("User Route");
});
router.post("/create", createNotes);
router.get("/getnote", getNotes);
router.get("/getnote/:id", getNotesById);
module.exports = router;
