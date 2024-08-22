
import { Router } from 'express';
import { 
    getContactsByIdController, 
    getContactsAllController, 
    createContactsController, 
    deleteContactsIdController, 
    patchContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema } from '../schemas/contactSchema.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
const router = Router();
router.use(authenticate);
router.get('/contacts', ctrlWrapper(getContactsAllController));
router.get('/contacts/:id', isValidId, ctrlWrapper(getContactsByIdController));
router.post('/', validateBody(contactSchema), ctrlWrapper(createContactsController));
router.patch('/contacts/:id', isValidId, validateBody(contactSchema), ctrlWrapper(patchContactController));
router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactsIdController));

export default router;