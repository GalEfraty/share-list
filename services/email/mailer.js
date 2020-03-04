const sgMail = require("@sendgrid/mail");
const keys = require("../../config/keys");
const shareListEmailTemplate = require("./shareListEmailTemplate");

sgMail.setApiKey(keys.sendGridKey);

const sendShareMail = (fullNameFrom, listLink, emailFrom, emailTo, listName) => {
  const msg = {
    to: emailTo,
    from: "no-replay@gal-share-list.herokuapp.com/",
    // from: emailFrom,
    subject: "join the list",
    html: shareListEmailTemplate(fullNameFrom, listLink, listName)
  };

  try {
    sgMail.send(msg);
    return msg;
  } catch (error) {
    console.log("error sending mail", error);
    return error;
  }
};

module.exports = { sendShareMail };
