import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contact = await contactsQuery
  .skip(skip)
  .limit(limit)
  .sort({ [sortBy]: sortOrder })
  .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contact,
    ...paginationData,
  };
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