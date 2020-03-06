/*
* This script takes in a file and replaces strings.
*
* Usage: node parseJson.js file VAR1=value1 VAR2=value2
*/

var fs = require('fs');

fs.readFile(process.argv[2], 'utf8', async (err, contents) => {
  let result = contents
  process.argv.forEach((val, index) => {
    if (index < 3) return
    const valArray = val.split('=')
    result = result.replace(new RegExp(valArray[0]), valArray[1])
  })
  console.log(result)
});
