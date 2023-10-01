const fs = require('fs');
const readline = require('readline');

// Replace 'path/to/your/local/file.txt' with the actual file path
const filePath = 'file.txt';

// Create a readable stream for the file
const fileStream = fs.createReadStream(filePath);

// Create a readline interface to read the file line by line
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity, // Treat any line ending as a delimiter
});

// Event listener for each line
rl.on('line', (line) => {
  console.log('Line:', line);
});

// Event listener for the end of the file
rl.on('close', () => {
  console.log('File reading complete.');
});