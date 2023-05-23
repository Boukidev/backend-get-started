const transporter = require("../config/nodemailer.js");

exports.sendMail = async (req, res, next) => {
  try {
    const { to, subject, text } = req.body;

    const mailOptions = {
      from: "boukidev@gmail.com",
      to: to,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        res.status(500).json({ err: err });
      } else {
        console.log("Email sent !" + info.response);
        res.status(200).json({ message: "Email sent !" });
      }
    });
  } catch (error) {}
  next();
};
