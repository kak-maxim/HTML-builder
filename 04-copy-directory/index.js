const fileSystem = require("fs/promises");
const path = require("path");

const sourceDir = path.join(__dirname, "files");
const destinationDir = path.join(__dirname, "files-copy");

fileSystem.rm(destinationDir, { recursive: true, force: true })
  .catch(() => {})
  .then(() => fileSystem.mkdir(destinationDir, { recursive: true }))
  .then(() => fileSystem.readdir(sourceDir, { withFileTypes: true }))
  .then(files => {
    files.forEach(file => {
      if (file.isFile()) {
        const filePath = path.join(sourceDir, file.name);
        const destinationFilePath = path.join(destinationDir, file.name);
        fileSystem.copyFile(filePath, destinationFilePath)
          .then(() => console.log(`Copied: ${file.name}`));
      }
    });
  })
  .catch(err => console.error('Error occurred:', err));