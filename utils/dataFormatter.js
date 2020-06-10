const moment = require('moment');

module.exports = {
  // this function allows us to format the data the way that Highcharts needs it
  // to be formatted in for the graph to display. Because we are using a time series
  // graph the data needs to be returned in the following format:
  /*
    [
      [
        timestamp,
        yDataPoint
      ]
    ]
  */
  // we accept all of the unformatted activity data, as well as which property from
  // the data we want to format
  formatDataForGraph: (data, dataType) => {
    // create a new variable which will map over all of the data
    const formattedData = data.map((activity) => {
      // get a unix timestamp in milliseconds from the date
      const timestamp = moment(activity.date).format('x');
      // return the array format we need with the timestamp and the property from
      // the activity that we want to display. Make sure that these values are
      // integers or the graph cannot read them
      return [parseInt(timestamp), parseInt(activity[dataType])];
    });

    // the graph requires the data to be sorted by timestamp, this sort function
    // does exactly that, it sorts all of the data by the 0 index in the array,
    // which is the timestamp for each data point
    return formattedData.sort((a, b) => {
      return a[0] - b[0];
    });
  },
};
