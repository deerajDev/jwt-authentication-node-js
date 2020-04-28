const express = require("express");
const accountRouter = require("./accounts/routes");
const router = express.Router();

router.use("/accounts", accountRouter);

module.exports = router;
