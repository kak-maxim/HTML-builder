const fs = require("fs").promises;
const path = require("path");

const stylesDir = path.join(__dirname, "styles");
const outDir = path.join(__dirname, "project-dist");
const outFile = path.join(outDir, "bundle.css");

async function mergeStyles() {
  try {
    await fs.mkdir(outDir, { recursive: true });
    const entries = await fs.readdir(stylesDir, { withFileTypes: true });

    const cssFiles = entries.filter(
      (entry) => entry.isFile() && path.extname(entry.name) === ".css"
    );

    const stylesPromises = cssFiles.map((file) =>
      fs.readFile(path.join(stylesDir, file.name), "utf-8")
    );

    const styles = await Promise.all(stylesPromises);
    const stylesBundle = styles.join("\n");
    await fs.writeFile(outFile, stylesBundle, "utf-8");
    console.log("\ncomplete")
  } catch (err) {
    console.error("error", err);
  }
}
mergeStyles();
