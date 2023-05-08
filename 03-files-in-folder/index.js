const fs = require('fs');
const path = require('path');
const textPath = path.join(__dirname, 'secret-folder');

fs.readdir(textPath, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log('Error');
  } else {
    files.forEach((item) => {
      if (!item.isFile()) {
        console.log(`Error! ${item.name} is not a file!`);
      }
      else {
      const {name} = item;
      let extension = path.extname(`${name}`);
      fs.stat(`${textPath}\\${name}`, (err, states) => {
        if (err) {
          console.log(`Error!`);
        }
        else {
          console.log(`${name.split('.')[0]} - ${extension.slice(1)} - ${(states.size / 1024).toFixed(3)}kb`);
        }
      });
      }
    });
  }
});
