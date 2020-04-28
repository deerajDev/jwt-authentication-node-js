//third party modules
const { model, connect } = require("mongoose");
require("dotenv").config();
//connecting to mongodb database
connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//local modules
const { userSchema } = require("./schema");

//class for creating users to mongo-db database
const UserModel = model("users", userSchema, "users");

module.exports = {
  UserModel,
};
