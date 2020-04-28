const { Schema } = require("mongoose");

//user schema
const userSchema = new Schema({
  //validation will be done by the controller
  email: String,

  //minimum number of characters should be atleast 8 characters in length
  password: {
    type: String,
    minlength: [8, "password must be contain atleast 8 characters"],
  },

  //maximum number of devices allowed to logged in simultaneous is 5
  numDevices: {
    type: Number,
    max: [5, "number of devices exceeded 5"],
  },
});

module.exports = {
  userSchema,
};
