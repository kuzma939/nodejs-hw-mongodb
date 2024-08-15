
import { Router } from 'express';
import { getContactsByIdController, getContactsAllController, createContactsController, deleteContactsIdController, patchContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema, contactUpdateSchema } from '../schemas/contactSchema.js';
import { isValidId } from '../middlewares/isValidId.js';
const router = Router();

router.get('/contacts', ctrlWrapper(getContactsAllController));
router.get('/contacts/:id', isValidId, ctrlWrapper(getContactsByIdController));
router.post('/contacts', validateBody(contactSchema), ctrlWrapper(createContactsController));
router.patch('/contacts/:id', isValidId, validateBody(contactUpdateSchema), ctrlWrapper(patchContactController));
router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactsIdController));

export default router;