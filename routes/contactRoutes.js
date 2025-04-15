const express = require("express");
const router = express.Router();
const { getContact, postContact, getContactid, putContact, deleteContact } = require("../controllers/contactscontroller");

router.route("/").get(getContact).post(postContact);

router.route("/:id").get(getContactid).put(putContact).delete(deleteContact);

module.exports = router;