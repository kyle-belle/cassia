// process media. Create multiple sizes for images, convert videos to web-friendly formats, etc.
import path from "path";
import fs from "fs";
import cp from "child_process";

/**
 * commands to use
 * Image Resize:
 * ffmpeg -y -i "{path}" -vf "scale={SIZE}:-2" -q:v 3 "{SIZE}/$f"
 *
 * Image WebP Conversion:
 * ffmpeg -y -i "{path}" -q:v 80 -compression_level 6 "{path}.webp"
 *
 * Video MP4 Conversion:
 * ffmpeg -i "{path}" -b:v 900k -b:a 64k "{path}_fixed.mp4"
 */

const IMAGE_MEDIA_DIR = path.join(__dirname, "..", "public", "images", "tmp");
const VIDEO_MEDIA_DIR = path.join(__dirname, "..", "public", "videos", "tmp");
const IMAGE_OUTPUT_DIR = path.join(__dirname, "..", "public", "images");
const VIDEO_OUTPUT_DIR = path.join(__dirname, "..", "public", "videos");

const IMAGE_SIZES = [
  { suffix: "1200", width: 1200 },
  { suffix: "1600", width: 1600 },
  { suffix: "1920", width: 1920 },
];

// Process images: create multiple sizes in jpeg and also convert to webp using ffmpeg
async function processImages() {
  const files = await fs.promises.readdir(IMAGE_MEDIA_DIR).catch((e) => {
    console.error("Error reading image media directory:", e);
    return [];
  });
  for (const file of files) {
    const inputPath = path.join(IMAGE_MEDIA_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);

    // create multiple sizes and move original to base output dir
    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      for (const size of IMAGE_SIZES) {
        const outputDir = path.join(IMAGE_OUTPUT_DIR, size.suffix);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        const outputPath = path.join(outputDir, file);
        const ffmpegCmd = `ffmpeg -y -i "${inputPath}" -vf "scale=${size.width}:-2" -q:v 3 "${outputPath}"`;
        console.log(`Executing: ${ffmpegCmd}`);
        cp.execSync(ffmpegCmd);

        // Convert to WebP
        const webpOutputPath = path.join(outputDir, `${baseName}.webp`);
        const webpCmd = `ffmpeg -y -i "${inputPath}" -q:v 80 -compression_level 6 "${webpOutputPath}"`;
        console.log(`Executing: ${webpCmd}`);
        cp.execSync(webpCmd);
      }
      // Move original to base output dir
      const originalOutputPath = path.join(IMAGE_OUTPUT_DIR, file);
      fs.renameSync(inputPath, originalOutputPath);
    }
  }
}

// Process videos: convert to mp4 and webm using ffmpeg
async function processVideos() {
  const files = await fs.promises.readdir(VIDEO_MEDIA_DIR).catch((e) => {
    console.error("Error reading video media directory:", e);
    return [];
  });
  for (const file of files) {
    const inputPath = path.join(VIDEO_MEDIA_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);

    if ([".mov", ".avi", "mp4", ".mkv", ".wmv", ".flv"].includes(ext)) {
      // Convert to MP4
      const mp4OutputPath = path.join(
        VIDEO_OUTPUT_DIR,
        `${baseName}_fixed.mp4`
      );
      const mp4Cmd = `ffmpeg -y -i "${inputPath}" -b:v 900k -b:a 64k "${mp4OutputPath}"`;
      console.log(`Executing: ${mp4Cmd}`);
      cp.execSync(mp4Cmd);
    }
  }
}

async function main() {
  console.log("Processing images...");
  await processImages();
  console.log("Image processing completed.");

  console.log("Processing videos...");
  await processVideos();
  console.log("Video processing completed.");
}

main().catch((err) => {
  console.error("Error processing media:", err);
});
