import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    console.log('Contacts:', contacts); 
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error; 
  }
};

export const getContactsById = async (id) => {
  const contact = await ContactsCollection.findOne({ _id: id });
  return contact;
};

export const createContacts = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

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
export const deleteContacts = async (contactsId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactsId,
  });

  return contact;
}