import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
// Requires Poppler's pdfimages. Extract original images, never render/crop PDF pages.
const temp = mkdtempSync(join(tmpdir(), "nestora-designs-"));
const names = [
  "living-tv",
  "bedroom-one",
  "bedroom-two",
  "bedroom-three",
  "kitchen",
  "study",
  "pooja",
  "foldable-table",
];
try {
  mkdirSync("public/images/projects", { recursive: true });
  execFileSync("pdfimages", [
    "-f",
    "1",
    "-l",
    "1",
    "-j",
    "Interior_3D_Designs.pdf",
    join(temp, "render"),
  ]);
  for (const [i, name] of names.entries()) {
    await sharp(join(temp, `render-${String(i).padStart(3, "0")}.jpg`))
      .resize({ width: 1536, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(`public/images/projects/${name}.webp`);
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}
