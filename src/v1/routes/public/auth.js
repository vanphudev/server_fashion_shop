const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __AUTH_CONTROLLER__ = require("../../controllers/authController");

rootRouter.post("/signin", asyncHandler(__AUTH_CONTROLLER__.signIn));
rootRouter.post("/createAccount", asyncHandler(__AUTH_CONTROLLER__.createAccount));

module.exports = rootRouter;
