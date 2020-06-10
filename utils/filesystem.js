const fs = require('fs');
const util = require('util');

module.exports = {
  // create promise-based read and write file functions so that we can use
  // .then and .catch to make our code a bit cleaner
  readFileAsync: util.promisify(fs.readFile),
  writeFileAsync: util.promisify(fs.writeFile),
};
