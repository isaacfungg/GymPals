const fs = require('fs');
const readline = require('readline');

try {
  const fileStream = fs.createReadStream('file.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treat any line ending as a delimiter
  });

  rl.on('line', (line) => {
    // Process the line here
    console.log(line); // Print the line to the console as an example
  });

  rl.on('close', () => {
    console.log('File reading complete.');
  });
} catch (error) {
  console.error(error);
}