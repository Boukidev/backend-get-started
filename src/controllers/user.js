require("dotenv").config();
const jwtSecret = process.env.SECRET_JWT;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hash });
    res.status(201).json({ Message: "User created !", user: newUser });
    console.log({ User: newUser });
  } catch (error) {
    res.status(500).json({ Error: error });
    console.log({ Error: error });
  }
};

exports.login = async (req, res) => {
  try {
    const token = jwt.sign({ userId: req.user._id }, jwtSecret, { expiresIn: "24h" });
    res.status(200).json({ Token: token });
  } catch (error) {
    res.status(500).json({ Error: error });
    console.log({ Error: error });
  }
};

// exports.updateProfile = async (req, res) => {
//   try {
//     const { username, email, firstName, lastName, dateBirth, bio, adress, profession } = req.body;
//     await User.updateOne(
//       { _id: req.params.id },
//       {
//         _id: req.params.id,
//         username,
//         email,
//         firstName,
//         lastName,
//         dateBirth,
//         bio,
//         adress,
//         profession,
//       }
//     );
//     res.status(200).json({ message: "Profile updated !" });
//   } catch (error) {
//     res.status(500).json({ Error: error });
//     console.log({ Error: error });
//   }
// };
