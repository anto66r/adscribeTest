
// eslint-disable-next-line @typescript-eslint/no-var-requires
const watch = require('node-watch');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const watchDir = `${__dirname}/../src/theme/`;

watch(watchDir, {
  filter: f => !f.includes('client/src/theme/default'),
  recursive: true,
}, (evt, name) => {
  const themeFolder = name.split('client/src/theme');
  const test = themeFolder[1].split('/');
  test.splice(0, 2);
  // todo, instead of knowing what happened, just copy the whole folder
  const newFolder = `${watchDir}default/${test.join('/')}`;
  fs.copyFileSync(name, newFolder);
  console.log('%s changed.', name);
});

console.log('Watching for SASS');
