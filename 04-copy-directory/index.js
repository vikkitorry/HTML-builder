const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true }, err => {
  if (err) throw err;
});

fs.readdir(path.join(__dirname, 'files'), {recursive: true }, (err, elm) => {
  if (err) throw err;
  for (let i = 0; i < elm.length; i++)
});