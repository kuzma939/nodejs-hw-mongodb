import createHttpError from 'http-errors';
import { getAllContacts, getContactsById, createContacts, deleteContacts, updateContact } from '../services/contacts.js';

export const getContactsAllController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactsId } = req.params;
  try {
    const contact = await getContactsById(contactsId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactsId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const createContactsController = async (req, res, next) => {
  try {
    const contact = await createContacts(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const patchContactController = async (req, res, next) => {
  const { contactsId } = req.params;
  try {
    const result = await updateContact(contactsId, req.body);
    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }
    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.contact,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContactsIdController = async (req, res, next) => {
  const { contactsId } = req.params;
  try {
    const contact = await deleteContacts(contactsId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};