const { readFileAsync, writeFileAsync } = require('./filesystem');
const path = require('path');

// this ActivityRepository is a repository of activities. Essentially it is
// responsible for maintaining the list of activities of our application,
// which includes adding new activities, getting the current list of activities
// as well as persisting that activity data to a JSON file stored on our server.
class ActivityRepository {
  constructor() {
    // store the path of the file we want to save activities in on the object
    // constructed from this repository so that we can access it in a few different
    // places
    this.filePath = path.join(__dirname, '..', 'data', 'activities.json');

    // when our ActivityRepository is created we want to make sure it is loaded
    // with the initial data from our JSON file
    // use our readFileAsync utility function (just a promised based fs.readFile)
    // to load the data from the filepath
    readFileAsync(this.filePath, 'utf8')
      // once the data has been read
      .then((data) => {
        // set the activities to the parsed version of the data
        this.activities = JSON.parse(data);
      })
      // if there was an error like the file didn't exist, or something else happened
      .catch((err) => {
        // set the activities to an empty array
        this.activities = [];
      });
  }

  // when we want to add a new activity to the list
  addActivity(activity) {
    // push the activity object provided into the activities array
    this.activities.push(activity);
    // make sure to save the new list of activities to the file
    this.saveActivities();
  }

  // simply a getter function to return the activities
  getActivities() {
    return this.activities;
  }

  // a utility function for us that just takes the current activities and returns
  // it as a JSON string, which we use for saving
  getActivitesAsJSON() {
    return JSON.stringify(this.getActivities());
  }

  // save all of the current activities into a JSON file
  saveActivities() {
    // use our writeFileAsync utility function to save the activity JSON in the file
    // this will overwrite anything that is already there
    writeFileAsync(this.filePath, this.getActivitesAsJSON(), 'utf8').catch(
      (err) => {
        console.error(err);
      }
    );
  }
}

module.exports = ActivityRepository;
