const fs = require('fs');
const path = require('path');
const fsP = require('fs/promises');

const stylesSource = path.join(__dirname, 'styles');
const stylesDest = path.join(__dirname, 'project-dist', 'style.css');
const assetsSource = path.join(__dirname, 'assets');
const assetsDest = path.join(__dirname, 'project-dist', 'assets');

const componentsPath = path.join(__dirname, 'components');
const htmlDest = path.join(__dirname, 'project-dist', 'index.html');

const addDir = async (dest) => {
  await fsP.mkdir(dest, {recursive: true});
  await fsP.rm(dest, {recursive: true});
  await fsP.mkdir(dest);
};

const copyDir = async (source, dest) => {
  await addDir(dest);
  const files = await fsP.readdir(source, {withFileTypes: true});
  for (let i = 0; i < files.length; i++) {
    const name = files[i].name;
    if (files[i].isFile()) {
      await fsP.copyFile(path.join(source, name), path.join(dest, name));
    } else {
      await copyDir(path.join(source, name), path.join(dest, name));
    }
  }
};

const copyStyles = async () => {
  fs.readdir(stylesSource, (err, files) => {
    if (err) throw err;
    let data = '';
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(__dirname, 'styles', files[i]);
      fs.stat(filePath, (err, info) => {
        if (err) throw err;
        if (path.parse(files[i]).ext === '.css' && info.isFile) {
          const streamRead = fs.createReadStream(filePath, 'utf-8');
          streamRead.on('data', chunk => data += chunk);
          streamRead.on('end', () => {
            fs.writeFile(stylesDest, data, (err) => {
              if (err) throw err;
            });
          });
        }
      });
    }
  });
};

const copyHtml = async () => {
  fs.createReadStream(path.join(__dirname, 'template.html'))
    .on('data', (data) => {
      fs.createWriteStream(htmlDest).write(data);
    });
};

const addComponents = async () => {
  const streamRead = fs.createReadStream(path.join(__dirname, 'template.html'));
  streamRead.on('data', (data) => {
    let htmlData = data.toString();
    fs.readdir(path.join(componentsPath), {withFileTypes: true}, (err, files) => {
      if(err) throw err;
      for (let i = 0; i < files.length; i++) {
        const lastComponent = files.length - 1 === i;
        const fileName = files[i].name;
        if (path.parse(fileName).ext === '.html' && files[i].isFile()) {
          const readComponent = fs.createReadStream(path.join(componentsPath, fileName));
          readComponent.on('data', (chunk) => {
            htmlData = htmlData.replaceAll(`{{${path.parse(fileName).name}}}`, chunk.toString());
            if ( lastComponent ) {
              fs.createWriteStream(htmlDest).write(htmlData);
              console.log('Ура!! Все прошло успешно! ^.^');
            }
          });
        }
      }
    });
  });
};

(async function () {
  try {
    await copyDir(assetsSource, assetsDest);
    await copyStyles();
    await copyHtml();
    await addComponents();
  } catch(err) {
    console.log(err);
  }
})();

