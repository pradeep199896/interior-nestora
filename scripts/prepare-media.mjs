import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
const ff = "node_modules/ffmpeg-static/ffmpeg";
const frames = [
  ["living", 2, "WhatsApp Video 2026-09-07 at 10.33.36.mp4"],
  ["storage", 45, "WhatsApp Video 2026-09-07 at 10.33.36.mp4"],
  ["module", 85, "WhatsApp Video 2026-09-07 at 10.33.36.mp4"],
  ["tv-detail", 8, "WhatsApp Video 2026-09-07 at 10.33.36.mp4"],
  ["kitchen-detail", 1, "WhatsApp Video 2026-09-07 at 10.32.54.mp4"],
  ["kitchen", 2, "WhatsApp Video 2026-09-07 at 10.32.54.mp4"],
  ["detail", 2, "WhatsApp Video 2026-09-07 at 10.32.57.mp4"],
  ["pooja", 32, "WhatsApp Video 2026-09-07 at 10.33.36.mp4"],
];
for (const [name, second, source] of frames) {
  if (!existsSync(source)) continue;
  execFileSync(ff, [
    "-hide_banner",
    "-loglevel",
    "error",
    "-ss",
    String(second),
    "-i",
    source,
    "-frames:v",
    "1",
    "-y",
    `/tmp/nestora-${name}.png`,
  ]);
  await sharp(`/tmp/nestora-${name}.png`)
    .webp({ quality: 85 })
    .toFile(`public/images/${name}.webp`);
}
execFileSync(ff, [
  "-hide_banner",
  "-loglevel",
  "error",
  "-i",
  "WhatsApp Video 2026-09-07 at 10.33.36.mp4",
  "-an",
  "-c:v",
  "libx264",
  "-preset",
  "fast",
  "-crf",
  "26",
  "-movflags",
  "+faststart",
  "-y",
  "public/videos/walkthrough.mp4",
]);
