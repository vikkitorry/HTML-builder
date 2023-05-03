const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

fs.mkdir(newFolder, {recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(folder, (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    fs.copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]), (err) => {
      if (err) throw err;
    });
  }

  fs.readdir(newFolder, (err, filesCopied) => {
    if (err) throw err;
    if (files.length < filesCopied.length) {
      const uniq  = new Set(files);
      // find extra file in new folder and delete
      const delExtra = filesCopied.filter((elm) => !uniq.includes(elm));
      for (let i = 0; i < delExtra.length; i++) {
        fs.unlink(path.join(__dirname, 'files-copy', delExtra[i]), (err) => {
          if (err) throw err;
        });
      }
    }
  });
});