const fs = require('fs');
const path = require('path');
const { stdin } = require('node:process');
const route = path.join(__dirname, '.\\text.txt');
const fileStream = fs.createWriteStream(route, 'utf-8');

console.log('hi pls enter your text\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
      console.log("bye");
      process.exit();
  }
  else {
    fileStream.write(data, 'utf-8');
  }
});

process.addListener('SIGINT', () => {
  console.log("bye");
  process.exit();
});