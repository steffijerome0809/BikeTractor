// because our routes are not defined inside of the server.js file (where the app
// variable is scoped) we need to make sure we are adding our routes to a new
// Router instance, which we create like this
const router = require('express').Router();

// get our other dependencies we need like our data formatter
const { formatDataForGraph } = require('../utils/dataFormatter');

// pull in our ActivityRepository class
const ActivityRepository = require('../utils/ActivityRepository');

// create a new ActivityRepository so we can handle everything we need for
// storing our activity data
const ActivityRepo = new ActivityRepository();

// route for creating a new activity
router.post('/activities', (req, res) => {
  // use object destructuring to get the three properties of the activity
  const { mileage, duration, date } = req.body;

  // do some basic error checking, to make sure that each activity has
  // the mileage, duration, and date defined. If these fields are missing
  // return back a 400 status with a message we can display to the user.
  if (!mileage) {
    return res.status(400).json({
      success: false,
      message: 'Mileage is required.',
    });
  }

  if (!duration) {
    return res.status(400).json({
      success: false,
      message: 'Duration is required.',
    });
  }

  if (!date) {
    return res.status(400).json({
      success: false,
      message: 'Date is required.',
    });
  }

  // if we did not return before (meaning there was an error) than we're going to
  // add the new activity using our ActivityRepo
  ActivityRepo.addActivity(req.body);

  // send back a json response with the activities and a success: true
  res.json({
    activities: ActivityRepo.getActivities(),
    success: true,
  });
});

// router for getting our graph data by duration
router.get('/graphs/duration', (req, res) => {
  // because we made the reusable formatDataForGraph function we can very easily
  // format the data we need by getting the activities from the ActivityRepo
  // and then passing in the property name of the data we want to extract and format
  // in this case duration
  const formattedData = formatDataForGraph(
    ActivityRepo.getActivities(),
    'duration'
  );

  // send back the formatted data as JSON
  res.json(formattedData);
});

router.get('/graphs/mileage', (req, res) => {
  // because we made the reusable formatDataForGraph function we can very easily
  // format the data we need by getting the activities from the ActivityRepo
  // and then passing in the property name of the data we want to extract and format
  // in this case mileage
  const formattedData = formatDataForGraph(
    ActivityRepo.getActivities(),
    'mileage'
  );

  // send back the formatted data as JSON
  res.json(formattedData);
});

// make sure that we export our router so that it can be included in our server.js
module.exports = router;
