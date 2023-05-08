const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const readFileStream = fs.createReadStream(filePath, 'utf8');
readFileStream.on('data', (chunk) => {
    console.log(chunk);
});