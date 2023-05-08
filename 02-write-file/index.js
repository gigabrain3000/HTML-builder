const fs = require('fs');
const path = require('path');
const readline = require('readline');

const textPath = path.join(__dirname, 'result.txt');
const writeStream = fs.createWriteStream(textPath);

console.log('Введите текст. Для выхода введите exit');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function writeToFile(text) {
  writeStream.write(`${text}\n`);
}

function handleInput(input) {
  if (input === 'exit') {
    writeStream.end();
    process.exit(0);
  }
  else {
    writeToFile(input);
  }
}

rl.on('line', handleInput);

process.on('exit', () => {
  console.log('До свидания!');
});