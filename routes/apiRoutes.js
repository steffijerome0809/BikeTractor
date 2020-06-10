const router = require("express").Router();

// add our routes

// route for saving activity data

// route for getting activity data by duration

// route for getting activity data by mileage

router.post("/activities", (req, res) => {
  const { mileage, duration, date } = req.bosy;
});

module.exports = router;
