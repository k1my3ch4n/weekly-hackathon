import fs from "fs-extra";
import path from "path";

const FSD_LAYERS = ["pages", "widgets", "features", "entities", "shared"];
const SHARED_SUBFOLDERS = ["ui", "api", "lib", "model"];

export async function generateFSD(targetDir, ext) {
  for (const layer of FSD_LAYERS) {
    const layerDir = path.join(targetDir, "src", layer);
    await fs.ensureDir(layerDir);
    await fs.writeFile(path.join(layerDir, `index.${ext}`), "");

    if (layer === "shared") {
      for (const subfolder of SHARED_SUBFOLDERS) {
        const subDir = path.join(layerDir, subfolder);
        await fs.ensureDir(subDir);
        await fs.writeFile(path.join(subDir, `index.${ext}`), "");
      }
    }
  }
}
