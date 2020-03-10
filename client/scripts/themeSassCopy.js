// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');

const args = process.argv.slice(2);
const themeName = args[0];
if (!themeName) {
  process.stdout.write('Error: A theme folder should be passed to the themeSassCopy routine\n');
  process.exit(1);
}

const defaultDir = `${process.env.PWD}/src/theme/default`;
const selectedThemeFolder = `${process.env.PWD}/src/theme/${themeName}/`;

if (!fs.existsSync(selectedThemeFolder)) {
  process.stdout.write(`Error: The selected theme ${themeName} does not exist\n`);
  process.exit(1);
}

// 1. Delete the default folder
fs.removeSync(defaultDir);

// 2. Create a new fresh default folder
if (!fs.existsSync(defaultDir)) {
  fs.mkdirSync(defaultDir);
}

// 3. Copy all the files of the selected theme to the default folder
fs.copySync(
  selectedThemeFolder,
  `${defaultDir}/`,
);

process.stdout.write(`Copied theme ${themeName} to ${defaultDir}\n`);
process.exit(0);
