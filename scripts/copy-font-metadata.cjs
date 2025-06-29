const fs = require('node:fs');
const path = require('node:path');

const sourcePath = path.resolve(
  __dirname,
  '../node_modules/google-font-metadata/data/google-fonts-v2.json'
);
const destDir = path.resolve(__dirname, '../src/data');
const destPath = path.resolve(destDir, 'google-fonts-v2.json');

try {
  if (!fs.existsSync(sourcePath)) {
    console.error(
      `Error: Source file not found: ${sourcePath}`
    );
    console.error("Make sure 'google-font-metadata' is installed correctly.");
    process.exit(1);
  }

  // Ensure destination directory exists
  fs.mkdirSync(destDir, { recursive: true });

  // Copy the file
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Successfully copied ${sourcePath} to ${destPath}`);

} catch (error) {
  console.error(`Error copying font metadata: ${error.message}`);
  process.exit(1);
}
