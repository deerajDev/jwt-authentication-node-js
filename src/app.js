//third party libraries
const express = require("express");
require("dotenv").config();

//index Route
const indexRoute = require("./indexRoute");

//app object
const app = express();

//app middleware
app.use(indexRoute);

//spinning up the server
app.listen(process.env.PORT || 9000, () =>
  console.log("Server listening on port ", process.env.PORT || 9000)
);
