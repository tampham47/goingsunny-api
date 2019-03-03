'use strict';

var child_process = require('child_process');

// trigger to update goingsunny ranking
exports.trigger = (event) => {
  child_process.exec(
    `curl -X GET -d {} https://api.goingsunny.com/api/v1/updateRanking`,
    (error, stdout, stderr) => {
      if (!error) {
        console.log('Awesome, your ranking is rebuilding...');
        return 0;
      }
      console.log('Ahh, something went wrong, check again duke, here the details', error);
      return -1;
    }
  );
};
