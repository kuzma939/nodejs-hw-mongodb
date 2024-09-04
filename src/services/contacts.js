import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  try {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();
  
   // Фільтрування за типом
   if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  // Фільтрування за isFavourite
  if (typeof filter.isFavourite !== 'undefined') {
    contactsQuery.where('isFavorite').equals(filter.isFavourite);
  }
  contactsQuery.where('userId').equals(userId);
  const [contactsCount, contact] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  console.log('Contacts:', contact); 
  return {
    data: contact,
    ...paginationData,
  }
  }
  
 catch (error) {
  console.error('Error fetching contacts:', error);
  throw error; 
};
};

export const getContactsById = async (id, userId) => {
  const contact = await ContactsCollection.findOne({ _id: id, userId });
  return contact;
};

export const createContacts = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};
export const updateContact = async (id,  userId, payload ) => {
  console.log("данныу", payload)
  const opaResult = await ContactsCollection.findOneAndUpdate(
    { _id: id, userId,  }, // Условия поиска документа
    payload, // Данные для обновления
    {
      new: true, // Возвращает обновленный документ
    }
  );
  return opaResult;
};
export const deleteContacts = async (id, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: id,
    userId,
  });

  return contact;
};