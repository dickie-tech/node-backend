//@desc Get all contacts
//@route GET /api/contacts
//@access public



const getContact = (req, res) => {
  res.status(200).json({ message:"Get all contacts"});
}
//@desc Create new contacts
//@route POST /api/contacts
//@access public



const postContact = (req, res) => {
  console.log("The request body is:", req.body)
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400)
    throw new Error( "All fields are mandatory");
  }
  res.status(200).json({ message:"Create new contact"});
}

//@desc Get contact by id
//@route GET /api/contacts/:id
//@access public



const getContactid = (req, res) => {
  res.status(200).json({ message:`Get contact for ${req.params.id}`});
}

//@desc Update contact for id
//@route PUT /api/contacts/:id
//@access public



const putContact = (req, res) => {
  res.status(200).json({ message:`Update contact for ${req.params.id}`});
}

//@desc Delete contact for id
//@route DELETE /api/contacts/:id
//@access public



const deleteContact = (req, res) => {
  res.status(200).json({ message:`Delete contact for ${req.params.id}`});
}

module.exports = {getContact, postContact, getContactid, putContact, deleteContact};