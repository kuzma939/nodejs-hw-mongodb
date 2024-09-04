import { Router } from 'express';
import { 
    getContactsByIdController, 
    getContactsAllController, 
    createContactsController, 
    deleteContactsIdController, 
    patchContactController 
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';
import { createContactsSchema, updateContactsSchema } from '../validation/contacts.js';
const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsAllController));
router.get('/:id', isValidId, ctrlWrapper(getContactsByIdController)); 
router.post('/', upload.single('photo'), validateBody(createContactsSchema), ctrlWrapper(createContactsController));
router.patch('/:id', upload.single('photo'), isValidId, validateBody(updateContactsSchema), ctrlWrapper(patchContactController)); 
router.delete('/:id', isValidId, ctrlWrapper(deleteContactsIdController)); 

export default router;