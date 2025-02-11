const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Notes Route");
});

router.get("/:id", (res,req)=>{
  res.send(req.params.id);
})
module.exports = router;
