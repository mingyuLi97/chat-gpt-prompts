/* eslint-disable @typescript-eslint/no-var-requires */
var crx3 = require('crx3'),
  path = require('path'),
  fs = require('fs'),
  packageJson = require('./package.json'),
  manifestJson = require('./src/manifest.json');

const context = process.cwd();
let manifestPath = path.join('./dist', 'manifest.json');
const name = packageJson.name;

updateVersion();
console.log(`Building '${name}' with manifest from ${manifestPath}`);

try {
  const extensionPath = path.join('dist', name + '.zip');
  if (fs.existsSync(extensionPath)) {
    fs.rmSync(extensionPath);
  }
  crx3([manifestPath], {
    keyPath: path.join('secrets', 'private-key.pem'),
    zipPath: extensionPath,
  }).then(function () {
    console.log('Extension package written to ' + extensionPath);
  });
} catch (errorMsg) {
  console.error(`Error: ${errorMsg}s`);
  return 1;
}

function updateVersion() {
  const version = packageJson.version;
  const idx = version.lastIndexOf('.') + 1;
  const newVersion =
    version.substring(0, idx) + (parseInt(version.substring(idx)) + 1);
  packageJson.version = newVersion;
  manifestJson.version = newVersion;
  fs.writeFileSync(
    path.resolve(context, 'package.json'),
    JSON.stringify(packageJson, null, 2) + '\n'
  );
  fs.writeFileSync(
    path.resolve(context, 'src/manifest.json'),
    JSON.stringify(manifestJson, null, 2) + '\n'
  );
}
