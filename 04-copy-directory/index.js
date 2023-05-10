const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');


const copyFolder = async () => {
    await fs.promises.mkdir(dest, {recursive: true});
    const files = await fs.promises.readdir(dest);
    for (let i = 0; i < files.length; i++) {
        await fs.promises.rm(path.resolve(__dirname, 'files-copy', files[i]))
    };
    const docs = await fs.promises.readdir(source);
    for (let i = 0; i < docs.length; i++) {
        const fileSource = path.resolve(__dirname, 'files', docs[i]);
        const fileDest = path.resolve(__dirname, 'files-copy', docs[i]);
        await fs.promises.copyFile(fileSource, fileDest);
    }
}
copyFolder();