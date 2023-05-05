const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');

fs.mkdir(dest, {recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(source, (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    fs.copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]), (err) => {
      if (err) throw err;
    });
  }

  fs.readdir(dest, (err, filesCopied) => {
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