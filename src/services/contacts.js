import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  console.log('Contacts:', contacts); 
  return contacts;
};

export const getContactsById = async (id) => {
  const contact = await ContactsCollection.findOne({ _id: id });
  return contact;
};

export const createContacts = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (id, payload, options = {}) => {
  const opaResult = await ContactsCollection.findOneAndUpdate(
    { _id: id },
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

export const deleteContacts = async (id) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: id,
  });

  return contact;
};