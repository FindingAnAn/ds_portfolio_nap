const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const photoDirectory = path.join(projectRoot, "assets", "profile-photo");
const indexPath = path.join(projectRoot, "index.html");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function syncProfilePhoto() {
  if (!fs.existsSync(photoDirectory)) {
    throw new Error(`Profile photo directory is missing: ${photoDirectory}`);
  }

  const entries = fs.readdirSync(photoDirectory, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile());

  if (entries.length !== 1 || files.length !== 1) {
    throw new Error(
      `Expected exactly one profile photo in ${photoDirectory}, found ${entries.length}.`
    );
  }

  const photoName = files[0].name;
  const extension = path.extname(photoName).toLowerCase();
  if (!supportedExtensions.has(extension)) {
    throw new Error(
      `Unsupported profile photo format "${extension}". Use JPG, PNG, WebP, or AVIF.`
    );
  }

  const encodedName = encodeURIComponent(photoName);
  const photoSource = `assets/profile-photo/${encodedName}`;
  const html = fs.readFileSync(indexPath, "utf8");
  const photoPattern =
    /(<img\b[^>]*\bdata-profile-photo\b[^>]*\bsrc=["'])[^"']*(["'][^>]*>)/i;

  if (!photoPattern.test(html)) {
    throw new Error("Could not find the data-profile-photo image in index.html.");
  }

  const updatedHtml = html.replace(photoPattern, `$1${photoSource}$2`);
  if (updatedHtml !== html) {
    fs.writeFileSync(indexPath, updatedHtml, "utf8");
  }

  console.log(`Profile photo: ${photoSource}`);
  return photoSource;
}

if (require.main === module) {
  syncProfilePhoto();
}

module.exports = { syncProfilePhoto };
