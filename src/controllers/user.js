require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

exports.signup = async (req, res, next) => {
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

exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    const payload = { userId: user._id };
    const secretKey = process.env.SECRET_JWT;
    const options = { expiresIn: "24h" };
    const token = jwt.sign(payload, secretKey, options);

    res
      .status(200)
      .setHeader("Authorization", "Bearer " + token)
      .json({ token });
  } catch (error) {
    res.status(500).json({ Error: error });
    console.error({ Error: error });
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.status(200).json({ Message: "Logged out !" });
  } catch (error) {
    res.status(500).json({ Error: error });
    console.error({ Error: error });
  }
};
