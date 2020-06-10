const router = require("express").Router();
const path = require("path");

// add our routes

router.get("/", function (req, res) {
  const filePath = path.join(__dirname, "..", "public", "html", "index.html");
  res.sendFile(filePath);
});

router.get;

module.exports = router;
