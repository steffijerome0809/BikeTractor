// include express
const express = require('express');

// create our express app
const app = express();

// define the port that our app will be listening on
const PORT = 8080;

// required our API and HTML Routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// middleware that is needed to use POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use our API and HTML routes that we exported earlier. We can define a prefix
// for these routes, like in the example with the apiRoutes where all the API
// routes will be prepended with /api
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// make sure our application is listening on our port
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
