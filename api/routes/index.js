import { Router } from 'express';
import {
    homeRoute, getContacts,
    getContactById, createContact, updateContact, deleteContact
} from '../controllers/contacts.js';
// get swagger documentation route
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json' with { type: 'json' };

const router = Router();

// Define a route for the home page
router.get('/', homeRoute);

// Define a route for the swagger documentation
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// get contacts route
router.get('/contacts', getContacts);
// post contacts route
router.post('/contacts', createContact);

// put contacts route
router.put('/contacts/:id', updateContact);

// delete contacts route
router.delete('/contacts/:id', deleteContact);

// get contacts by id route
router.get('/contacts/:id', getContactById);

export default router;
