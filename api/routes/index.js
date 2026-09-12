import { Router } from "express";
import { homeRoute, getContacts, getContactById} from "../controllers/contacts.js";

const router = Router();

// Define a route for the home page
router.get("/", homeRoute);

//get contacts route
router.get("/contacts", getContacts);

//get contacts by id route
router.get("/contacts/:id", getContactById);


export default router;