const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __CART_CONTROLLER__ = require("../../controllers/cartController");

rootRouter.get("/getCartById", asyncHandler(__CART_CONTROLLER__.getCartById));

module.exports = rootRouter;
