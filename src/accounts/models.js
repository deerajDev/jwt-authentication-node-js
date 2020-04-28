//third party modules
const { model } = require("mongoose");

//local modules
const { userSchema } = require("./schema");

//class for creating users to mongo-db database
const UserModel = model("users", userSchema);

module.exports = {
  UserModel,
};
