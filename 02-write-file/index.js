const {stdin, stdout} = process;
const fs = require('fs');
const path = require('path')
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Add your message:\n');
stdin.on('data', data => {
  const mssg = data.toString().trim();
  if (mssg === 'exit') {
    process.exit();
  } else {
    output.write(data);
  }
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Bye! ^.^'));