const { createTransport } = require("nodemailer");
const nodemailer = require("nodemailer");
exports.sendMail = async (text) => {
  try {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "3dbf88159ba168",
          pass: "07a1aa2f2a96ea"
        }
      });
    await transport.sendMail({
      from: "ms2364911@gmail.com",
      to: "srivastavm089@gmail.com",
      subject: "CONTACT REQUEST FROM PORTFOLIO",

      text,
    });
  
  } catch (error) {
      console.warn(error)
  }
};
