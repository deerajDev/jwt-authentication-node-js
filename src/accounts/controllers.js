//third party modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const accessToken = process.env.ACCESS_TOKEN;

//local modules
const { UserModel } = require("./models");

//================
//asynchronous function for user registration
async function register(req, res) {
  const saltRounds = 10;

  try {
    const { password, email } = req.body;
    const userCount = await UserModel.countDocuments({ email: email });
    if (userCount >= 1) {
      res.status(400);
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
      numDevices: 1,
    });

    //saving user to the database
    await user.save();

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

//====================
//asynchronous function for login
async function login(req, res) {
  const { email, password } = req.body;
  if (!email) {
    res.status(400);
    res.json({ error: "email is required" });
    return;
  }
  if (!password) {
    res.status(400);
    res.json({
      error: "password is required",
    });
  }
  const object = await UserModel.findOne({ email: email });
  console.log(object);

  //checking if email exist or not
  if (!object) {
    res.status(400);
    res.json({
      error: "email doesn't exist",
    });
    return;
  }
  //check if the password matches or not
  const passwordMatches = await bcrypt.compare(password, object.password);
  if (passwordMatches) {
    //creating the token
    if (object.numDevices >= 5) {
      res.status(401);
      res.json({
        error: "number of devices logged in exceeds 5",
      });
      return;
    } else {
      //incrementing the number of devices logged in
      await UserModel.updateOne({ email: email }, { $inc: { numDevices: 1 } });
      const token = await jwt.sign(email, accessToken);
      res.json({
        token: token,
      });
      return;
    }
  }
  //returning error if password didn't matched
  else {
    res.status(400);
    res.json({
      error: "password didn't matched",
    });
    return;
  }
}

//module exports
module.exports = {
  register,
  login,
};
