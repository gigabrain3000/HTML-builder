const fs = require('fs');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const componentsFolder = path.join(__dirname, 'components');
const templateFile = path.join(__dirname, 'template.html');
const assetsFolder = path.join(__dirname, 'assets');
const distFolder = path.join(__dirname, 'project-dist');
const styleCSS = path.join(distFolder, 'style.css');
const newAssetsFolder = path.join(distFolder, 'assets');
const indexHTML = path.join(distFolder, 'index.html');

//Создание папки project-dist
fs.mkdir(distFolder, {recursive: true}, (err) => {
  if (err) {
    console.log('Error!', err);
  } else {

    //Компановка стилей в файл style.css
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
              fs.appendFile(styleCSS, `${cssCode}\n`, (err) => {
                if (err) {
                  console.log('Error!');
                }
              });
          });
          }
        });
      }
    });

    //Копирование папки assets в папку project-dist
    fs.rm(newAssetsFolder, {force: true, recursive :true}, () => {
      fs.mkdir(newAssetsFolder, { recursive: true }, () => {
        readInnerFolders (assetsFolder, newAssetsFolder);
      });
    });

    //Рекурсивная функция для входа во вложенные папки внутри assets
    function readInnerFolders (source, destination) {
      fs.readdir(source, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        
        files.forEach((file) => {
          const newSource = path.join(source, file);
          const newDestination = path.join(destination, file);
      
          if (fs.lstatSync(newSource).isDirectory()) {
            fs.mkdir(newDestination, (err) => {
              if (err) {
                throw err;
              }
            });
            readInnerFolders(newSource, newDestination);
          } else {
            fs.copyFile(newSource, newDestination, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log(`${file} copied successfully`);
              }
            });
          }
        });
      });
    }

    //Замена шаблонных тегов в template.html на содержимое файлов папки components и копирование обновленного содержимого в index.html
    /*fs.readFile(templateFile, 'utf-8', (err) => {
      if (err) {
        throw err;
      }
      fs.readdir(componentsFolder, {withFileTypes: true}, (err, files) => {
        if (err) {
          throw err;
        }
        files.forEach((file) => {

        });
      });
    });*/
  }
});
