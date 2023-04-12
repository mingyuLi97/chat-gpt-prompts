/* eslint-disable @typescript-eslint/no-var-requires */
var crx3 = require('crx3'),
  path = require('path'),
  fs = require('fs'),
  packageJson = require('./package.json');

let manifestPath = path.join('./dist', 'manifest.json');
const name = packageJson.name;

console.log(`Building '${name}' with manifest from ${manifestPath}`);

try {
  const crxPath = path.join('dist', name + '.crx');
  const zipPath = path.join('dist', name + '.zip');
  if (fs.existsSync(crxPath)) {
    fs.rmSync(crxPath);
  }
  if (fs.existsSync(zipPath)) {
    fs.rmSync(zipPath);
  }
  crx3([manifestPath], {
    keyPath: path.join('secrets', 'private-key.pem'),
    crxPath,
    zipPath,
  }).then(function () {
    console.log(
      'Extension package written to ' + path.join('dist', name + '.crx')
    );
  });
} catch (errorMsg) {
  console.error(`Error: ${errorMsg}s`);
  return 1;
}
