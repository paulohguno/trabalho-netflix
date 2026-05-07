import fs from 'fs';
import path from 'path';
import https from 'https';

const IMAGES_DIR = path.join(process.cwd(), 'src', 'utils', 'images');

function ensureDir() {
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        }
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      })
      .on('error', (err) => {
        file.close();
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

export async function downloadImagesFromTmdb(items = [], tmdbBase = 'https://image.tmdb.org/t/p/w500') {
  ensureDir();

  const results = [];
  for (const it of items) {
    const poster = it.poster_path || it.backdrop_path;
    if (!poster) {
      results.push({ id: it.id, localPoster: null });
      continue;
    }

    const filename = `${it.id}_${poster.replace(/\//g, '')}`;
    const dest = path.join(IMAGES_DIR, filename);
    const url = tmdbBase + poster;

    try {
      // skip download if file exists
      if (!fs.existsSync(dest)) {
        // eslint-disable-next-line no-await-in-loop
        await downloadFile(url, dest);
      }
      results.push({ id: it.id, localPoster: filename });
    } catch (err) {
      results.push({ id: it.id, localPoster: null, error: err.message });
    }
  }

  return results;
}

export default { downloadImagesFromTmdb };
