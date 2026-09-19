// import mongodb from 'mongodb';
import { ObjectId } from 'mongodb';
import { initDB, getDB } from '../../connection.js';

await initDB();

const homeRoute = (req, res) => {
  /* #swagger.tags = ['Home']
     #swagger.summary = 'Home route'
     #swagger.description = 'Returns a welcome message for the home page.'
  */
  res.send('Welcome to the Home Page!');
};
// Get all contacts
const getContacts = async (req, res) => {
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Get all contacts'
     #swagger.description = 'Fetches all contact records from MongoDB.'
  */
  try {
    const db = getDB();
    const contacts = await db.collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Create a new contact'
     #swagger.description = 'Creates a new contact record in MongoDB.'
  */
  try {
    const db = getDB();
    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const result = await db.collection('contacts').insertOne(newContact);
    res.status(201).json({ message: 'Contact created', contactId: result.insertedId });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Update contact by ID'
     #swagger.description = 'Updates a single contact record in MongoDB.'
  */
  const { id } = req.params;
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  try {
    const db = getDB();
    const result = await db
      .collection('contacts')
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedContact });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact updated' });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Delete contact by ID'
     #swagger.description = 'deletes a single contact record from MongoDB.'
  */
  const { id } = req.params;
  try {
    const db = getDB();
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

// Get a contact by ID
const getContactById = async (req, res) => {
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Get contact details by ID'
     #swagger.description = 'Fetches a single contact record from MongoDB.'
     #swagger.parameters['id'] = { description: 'Contact ID' }
  */
  const { id } = req.params;
  try {
    const db = getDB();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    return res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    return res.status(500).json({ error: 'Failed to fetch contact' });
  }
};

export { homeRoute, getContacts, getContactById, createContact, updateContact, deleteContact };
