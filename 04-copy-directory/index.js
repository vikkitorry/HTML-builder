const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');

const copyFolder = async () => {
  await fs.promises.mkdir(dest, {recursive: true});
  const files = await fs.promises.readdir(dest);
  for (let i = 0; i < files.length; i++) {
    const fileCopy = path.join(__dirname, 'files-copy', files[i]);
    await fs.promises.rm(fileCopy);
  };
  const docs = await fs.promises.readdir(source);
  for (let i = 0; i < docs.length; i++) {
    const fileDest = path.join(__dirname, 'files-copy', docs[i]);
    const fileSource = path.join(__dirname, 'files', docs[i]);
    await fs.promises.copyFile(fileSource, fileDest);
  }
};
copyFolder();