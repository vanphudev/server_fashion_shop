"use strict";
const express = require("express");
const privateRouter = express.Router();

privateRouter.use(require("../../middlewares/Auth/authUtils").authentication);
privateRouter.use("/auth", require("./auth"));
privateRouter.use("/cart", require("./cart"));

module.exports = privateRouter;
