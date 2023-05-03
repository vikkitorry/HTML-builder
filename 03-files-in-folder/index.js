const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, elm) => {
  if (err) throw err;
  for (let i = 0; i < elm.length; i++) {
    fs.stat(path.join(__dirname, 'secret-folder', elm[i]), (err, info) => {
      if (info.isFile()) {
        console.log(`${path.parse(elm[i]).name} - ${path.parse(elm[i]).ext.slice(1)} - ${info.size} b`);
      }
    });
  }
});