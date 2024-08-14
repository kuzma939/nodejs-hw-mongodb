import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import { getAllContacts, getContactsById, createContacts, deleteContacts, updateContact } from '../services/contacts.js';
// eslint-disable-next-line no-unused-vars
export const getContactsAllController = async (req, res, next) => {
  
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  
};
// eslint-disable-next-line no-unused-vars
export const getContactsByIdController = async (req, res, next) => {
  try {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createHttpError(400, 'Invalid contact ID'));
  }  
    const contact = await getContactsById(id);
    if (!contact) {
      throw createHttpError(404, 'Contact no found');
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
// eslint-disable-next-line no-unused-vars
export const createContactsController = async (req, res, next) => {
    const contact = await createContacts(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  
};
// eslint-disable-next-line no-unused-vars
export const patchContactController = async (req, res, next) => {
  const { id } = req.params;

    const result = await updateContact(id, req.body);
    if (!result) {
      next(createHttpError(404, 'Contacts not found'));
      return;
     
    }
    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.contact,
    });
  
};
// eslint-disable-next-line no-unused-vars
export const deleteContactsIdController = async (req, res, next) => {
  const { id } = req.params;
  
    const contact = await deleteContacts(id);
    if (!contact) {
      next(createHttpError(404, 'Contacts not found'));
      return;
    
    }
    res.status(204).send();
  
};