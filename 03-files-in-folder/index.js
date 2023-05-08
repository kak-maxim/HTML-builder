const fs = require('fs').promises;
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

async function getFilesInfo(folder) {
  try {
    const files = await fs.readdir(folder, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(folder, file.name);
        const fileStat = await fs.stat(filePath);
        const fileSize = (fileStat.size / 1024).toFixed(3); 
        const fileExt = path.extname(file.name).slice(1);
        const fileName = path.basename(file.name, `.${fileExt}`);

        console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
      }
    }
  } catch (err) {
    console.error('ошибка', err);
  }
}
getFilesInfo(folder);