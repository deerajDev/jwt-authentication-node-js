//third party modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//local modules
const { UserModel } = require("./models");

//asynchronous function for user registration
async function register(req, res) {
  const saltRounds = 10;
  const accessToken = process.env.ACCESS_TOKEN;

  try {
    const { password, email } = req.body;
    const userCount = await UserModel.countDocuments({ email: email });
    if (userCount >= 1) {
      res.status(401);
      res.json({
        error: "email already exists",
      });
      return;
    }
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //creating UserModel instance
    const user = new UserModel({
      email: email,
      password: hashedPassword,
    });

    //saving user to the database
    await user.save("");

    //creating jwt token with payload of username
    const token = await jwt.sign(email, accessToken);

    //it successful then send the token
    res.json({
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
}

//asynchronous function for login
async function login(req, res) {
  res.json(req.body || { message: "send the data in json format" });
}

//module exports
module.exports = {
  register,
  login,
};
