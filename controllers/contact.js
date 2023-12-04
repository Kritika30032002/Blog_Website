const { Contact } = require("../models/contact");

module.exports.contactUs = (req, res) => {
  res.render("contact");
};

module.exports.contactUs = async (req, res, next) => {
  const { name, email, message } = req.body;
  try {
    if(!name || !email || !message){
        throw "All field are required"
    }
    const contactUs = await Contact.create({
        name,email,message
    })
    await contactUs.save()
    return res.send(
        "Message received successfully"
    )
  } catch (error) {
    next(error);
  }
};