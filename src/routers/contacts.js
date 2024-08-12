
import { Router } from 'express';
import { getContactsByIdController, getContactsAllController, createContactsController, deleteContactsIdController, patchContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsAllController));
router.get('/contacts/:contactsId', ctrlWrapper(getContactsByIdController));
router.post('/contacts', ctrlWrapper(createContactsController));
router.patch('/contacts/:contactsId', ctrlWrapper(patchContactController));
router.delete('/contacts/:contactsId', ctrlWrapper(deleteContactsIdController));

export default router;