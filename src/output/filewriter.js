import fs from 'node:fs/promises';
import { OUTFILE } from '../common/constants.js';

export async function writeFile(content) {
  const filepath = OUTFILE;
  try {
    await fs.writeFile(filepath, content);
  } catch (err) {
    console.error(err);
  }
}

