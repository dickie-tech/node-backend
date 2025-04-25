const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// @desc Create new contacts
// @route POST /api/contacts
// @access public
const postContact = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(200).json(contact);
});

// @desc Get contact by id
// @route GET /api/contacts/:id
// @access public
const getContactid = asyncHandler(async (req, res) => 
  {
      // Validate if the provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400); // Bad request for invalid ID format
        throw new Error("Invalid ID format");
      }
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(202).json(contact);
});

// @desc Update contact for id
// @route PUT /api/contacts/:id
// @access public
const putContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedContact);
});

// @desc Delete contact for id
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  // Fixed: Delete the contact by id
  await Contact.findByIdAndRemove(req.params.id);

  res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = { getContact, postContact, getContactid, putContact, deleteContact };
