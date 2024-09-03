import cloudinary from 'cloudinary';
import fs from 'fs/promises';

export const saveFileToCloudinary = async (file) => {
  try {
    console.log('Uploading file to Cloudinary:', file.path);
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);
    console.log('File uploaded to Cloudinary:', response.secure_url);
    return response.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};