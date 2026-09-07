import { execFileSync } from "node:child_process";
// Source and ready-to-use local media only. Never include credentials, caches, or original attachments.
execFileSync(
  "python3",
  [
    "-c",
    `
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root=Path.cwd()
folders=['app','components','lib','public','tests','scripts']
files=['package.json','package-lock.json','tsconfig.json','next-env.d.ts','next.config.ts','postcss.config.mjs','eslint.config.mjs','playwright.config.ts','vercel.json','.gitignore','.vercelignore','.prettierignore','.env.example','README.md','IMAGE-SOURCES.md','VERIFICATION.md']
with ZipFile(root/'nestora-interiors-source.zip','w',ZIP_DEFLATED) as archive:
    for folder in folders:
        for path in (root/folder).rglob('*'):
            if path.is_file() and path.name!='.DS_Store': archive.write(path,Path('nestora-interiors')/path.relative_to(root))
    for name in files:
        path=root/name
        if path.exists(): archive.write(path,Path('nestora-interiors')/name)
    assert archive.testzip() is None
print('Created nestora-interiors-source.zip')
`,
  ],
  { stdio: "inherit" },
);
