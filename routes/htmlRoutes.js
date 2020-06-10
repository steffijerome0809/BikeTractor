// because our routes are not defined inside of the server.js file (where the app
// variable is scoped) we need to make sure we are adding our routes to a new
// Router instance, which we create like this
const router = require('express').Router();

// we need the path module to get the path to our HTML file
const path = require('path');

// HTML route for displaying the homepage
router.get('/', (req, res) => {
  // create our file path to our index.html file
  const filePath = path.join(__dirname, '..', 'public', 'html', 'index.html');

  // send the file in the response
  res.sendFile(filePath);
});

// make sure that we export our router so that it can be included in our server.js
module.exports = router;
