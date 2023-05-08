const fs = require('fs').promises;
const path = require('path');

const source = path.join(__dirname, 'files');
const target = path.join(__dirname, 'files-copy');

async function copyDir(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entris = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entris) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error('error', err);
  }
}
copyDir(source, target);