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

  // Read the source JSON file
  const fullMetadata = require(sourcePath); // Using require here as it's a .cjs file and source is .json

  const targetFontIds = [
    'roboto',
    'open-sans',
    'lato',
    'montserrat',
    'oswald',
    'inter',
    'noto-sans',
    // Add other desired font IDs here
  ];

  const filteredMetadata = {};
  for (const fontId of targetFontIds) {
    if (fullMetadata[fontId]) {
      filteredMetadata[fontId] = fullMetadata[fontId];
    } else {
      console.warn(`Font ID "${fontId}" not found in source metadata. Skipping.`);
    }
  }

  // Write the filtered JSON to the destination file
  fs.writeFileSync(destPath, JSON.stringify(filteredMetadata, null, 2));
  console.log(`Successfully filtered and wrote metadata for ${Object.keys(filteredMetadata).length} fonts to ${destPath}`);

} catch (error) {
  console.error(`Error copying font metadata: ${error.message}`);
  process.exit(1);
}
