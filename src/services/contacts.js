import { ContactsCollection } from '../db/models/contacts.js';
import mongoose from 'mongoose'; 

export const getContactsById = async (contactsId) => {
  if (!mongoose.Types.ObjectId.isValid(contactsId)) {
    throw new Error('Invalid contact ID format');
  }
  try {
    // Використовуємо findById для Mongoose
    const contact = await ContactsCollection.findById(contactsId);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  } catch (error) {
    console.error(`Error fetching contact with id ${contactsId}: ${error.message}`);
    throw new Error('Failed to fetch contact');
  }
};

export const getAllContacts = async () => {
  try {
    // Використовуємо find() для Mongoose
    const contacts = await ContactsCollection.find();
    console.log('Contacts:', contacts);
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    throw new Error('Failed to fetch contacts'); 
  }
};
export const createContacts = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};
export const deleteContacts = async (contactsId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactsId,
  });

  return contact;
}
export const updateContact = async (contactsId, payload, options = {}) => {
  const opaResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactsId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!opaResult || !opaResult.value) return null;

  return {
    contact: opaResult.value,
    isNew: Boolean(opaResult?.lastErrorObject?.upserted),
  };
};