const fs = require('fs');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const bundleCSS = path.join(__dirname, 'styles', 'bundle.css');

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
        console.log('Error! Wrong file extension!');
      }
      else {
      const stream = fs.createReadStream(path.join(`${stylesFolder}\\${name}`), 'utf-8');
      stream.on('data', (chunk) => {
        arr.push(chunk);
      });
      stream.on('end', () => {
        const cssCode = arr.join('');
          fs.appendFile(bundleCSS, `${cssCode}\n`, (err) => {
            if (err) {
              console.log('Error!');
            }
          });
      });
      }
    });
  }
});