const fs = require('fs');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const bundleCSS = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(stylesFolder, {withFileTypes: true}, (err, files) => {
  let arr = [];
  if (err) {
    console.log('Error!');
  } else {
    files.forEach((item) => {
      const {name} = item;
      if (!item.isFile()) {
        console.log(`Error! ${name} is not a file!`);
      }
      else if (name.split('.')[1] != 'css') {
        console.log(`Error! ${name} has wrong file extension!`);
      }
      else {
      const stream = fs.createReadStream(path.join(`${stylesFolder}\\${name}`), 'utf-8');
      stream.on('data', (chunk) => {
        arr.push(chunk);
      });
      stream.on('end', () => {
        const cssCode = arr.join('');
          fs.writeFile(bundleCSS, `${cssCode}\n`, (err) => {
            if (err) {
              console.log('Error!');
            }
          });
      });
      }
    });
  }
});