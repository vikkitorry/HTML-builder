const fs = require('fs');
const path = require('path');
const projectPath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.join(__dirname, 'styles');

fs.readdir(stylesPath, (err, files) => {
  if (err) throw err;
  let data = '';
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(__dirname, 'styles', files[i]);
    fs.stat(filePath, (err, info) => {
      if (err) throw err;
      // info.isFile is necessary because folder with name "name.css"
      // return true in path.parse(files[i]).ext === '.css'
      if (path.parse(files[i]).ext === '.css' && info.isFile) {
        const streamRead = fs.createReadStream(filePath, 'utf-8');
        streamRead.on('data', chunk => data += chunk);
        streamRead.on('end', () => {
          fs.writeFile(projectPath, data, err => {
            if (err) throw err;
          });
        });
      }
    });

  }
});