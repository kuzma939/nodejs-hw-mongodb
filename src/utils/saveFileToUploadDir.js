import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { env } from './env.js';

export const saveFileToUploadDir = async (file) => {
  try {
    console.log('Moving file to local upload directory:', file.filename);
    await fs.rename(
      path.join(TEMP_UPLOAD_DIR, file.filename),
      path.join(UPLOAD_DIR, file.filename),
    );
    const fileUrl = `${env('APP_DOMAIN')}/uploads/${file.filename}`;
    console.log('File saved to local directory:', fileUrl);
    return fileUrl;
  } catch (error) {
    console.error('Error saving to local directory:', error);
    throw error;
  }
};