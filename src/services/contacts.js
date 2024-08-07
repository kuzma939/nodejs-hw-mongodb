import { ContactsCollection } from '../db/models/contacts.js';

const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

const getContactsById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export { getAllContacts, getContactsById };