const fs = require('fs');
const path = require('path');

let streamRead = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
streamRead.on('data', chunk => console.log(chunk));