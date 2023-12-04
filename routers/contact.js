const express = require("express");
const {contactUs} = require("../controllers/contact");

const router = express.Router();

router.route("/contact").post(contactUs);

module.exports = router;