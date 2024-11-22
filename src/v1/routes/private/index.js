"use strict";
const express = require("express");
const privateRouter = express.Router();

privateRouter.use(require("../../middlewares/Auth/authUtils").authentication);
privateRouter.use("/auth", require("./auth"));
privateRouter.use("/cart", require("./cart"));
privateRouter.use("/order", require("./order"));
privateRouter.use("/review", require("./danhGia"));

module.exports = privateRouter;
