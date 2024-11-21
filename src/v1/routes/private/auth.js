const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __AUTH_CONTROLLER__ = require("../../controllers/authController");

rootRouter.post("/refresh", asyncHandler(__AUTH_CONTROLLER__.handlerRefreshToken));
rootRouter.post("/logout", asyncHandler(__AUTH_CONTROLLER__.logOut));
rootRouter.get("/getAccId", asyncHandler(__AUTH_CONTROLLER__.getAccId));

module.exports = rootRouter;
