/**
 * Change your portfolio photo in one command.
 *
 *   npm run photo -- "C:\path\to\photo.jpg"
 *   npm run photo -- "C:\path\to\photo.jpg" --crop 55,240,780,975   (left,top,width,height in source pixels)
 *
 * Crops to a 4:5 portrait (auto-focus on the subject unless --crop is given),
 * resizes, compresses, and writes public/photo.jpg. Then refresh the page.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const args = process.argv.slice(2);
const input = args.find((a) => !a.startsWith("--"));
const cropArg = args[args.indexOf("--crop") + 1];
if (!input) {
  console.error('Usage: npm run photo -- "<path to image>" [--crop left,top,width,height]');
  process.exit(1);
}

mkdirSync("public", { recursive: true });
let img = sharp(input).rotate(); // respect EXIF orientation
if (args.includes("--crop") && cropArg) {
  const [left, top, width, height] = cropArg.split(",").map(Number);
  img = img.extract({ left, top, width, height });
}
const info = await img
  .resize(960, 1200, { fit: "cover", position: sharp.strategy.attention })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile("public/photo.jpg");
console.log(`Saved public/photo.jpg (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
