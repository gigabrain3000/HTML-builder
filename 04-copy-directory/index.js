const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'files');
const cloneFolderPath = path.join(__dirname, 'files-copy');

fs.rm(cloneFolderPath, {force: true, recursive :true}, () => {
  fs.mkdir(cloneFolderPath, { recursive: true }, () => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.log('Error');
      } else {
        files.forEach((item) => {
          fs.copyFile(`${folderPath}\\${item}`, `${cloneFolderPath}\\${item}`, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('File copied successfully');
            }
          });
        });
      }
    });
  });
});

