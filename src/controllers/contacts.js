import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import { getAllContacts, getContactsById, createContacts, deleteContacts, updateContact } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

// Контролер для отримання всіх контактів
// eslint-disable-next-line no-unused-vars
export const getContactsAllController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    userId: req.user._id,
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

// Контролер для отримання контакту за ID
export const getContactsByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, 'Invalid contact ID'));
    }

    const contact = await getContactsById(id, userId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Контролер для створення контакту
export const createContactsController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const payload = { ...req.body, userId };
    const photo = req.file;
    let photoUrl;

    if (photo) {
      if (env('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
      payload.photo = photoUrl;
    }

    const contact = await createContacts(payload, userId);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Контролер для оновлення контакту
export const patchContactController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const photo = req.file;
    let photoUrl;

    console.log('Uploaded photo:', photo);

    if (photo) {
      if (env('ENABLE_CLOUDINARY') === 'true') {
        console.log('Saving to Cloudinary...');
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        console.log('Saving to local directory...');
        photoUrl = await saveFileToUploadDir(photo);
      }
      console.log('Photo URL:', photoUrl);
    }
    
    const result = await updateContact(id,userId,{
      ...req.body,
      photo: photoUrl
    });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, 'Invalid contact ID'));
    }
    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }
    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
  } catch (err) {
    console.error('Error updating contact:', err);
    next(err);
  }
};

// Контролер для видалення контакту
export const deleteContactsIdController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, 'Invalid contact ID'));
    }

    const contact = await deleteContacts(id, userId);
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

