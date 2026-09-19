const contactSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }
};

// Export the contact schema
module.exports = contactSchema;
