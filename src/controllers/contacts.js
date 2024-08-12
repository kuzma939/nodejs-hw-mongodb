import { getAllContacts, 
    getContactsById,
     createContacts, 
     deleteContacts,
     updateContact } from '../services/contacts.js'
    
    
    export const getContactsAllController = async (reg, res, next) => {
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
    // eslint-disable-next-line no-unused-vars
    export const getContactsByIdController = async (reg, res) => {
      const contact = await getContactsById(contactsId);
        const { contactsId } = req.params;
        if (!contact) {
            throw createHttpError(404, 'Contact no found');
          }
          res.json({
            status: 200,
            message: `Successfully found contact with id ${contactsId}!`,
            data: contact,
          });
        };
       
    export const createContactsController = async (req, res) => {
        const contact = await createContacts(req.body);
        res.status(201).json({
          status: 201,
          message: 'Successfully created a contact!',
          data: contact,
        });
      };
      export const patchContactController = async (req, res, next) => {
        const { contactsId } = req.params;
        const result = await updateContact(contactsId, req.body);
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
      export const deleteContactsIdController = async (req, res, next) => {
        const { contactsId } = req.params;
      
        const contact = await deleteContacts(contactsId);
      
        if (!contact) {
          next(createHttpError(404, 'Student not found'));
          return;
        }
      
        res.status(204).send();
      };