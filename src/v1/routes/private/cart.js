const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __CART_CONTROLLER__ = require("../../controllers/cartController");

rootRouter.get("/getCartById", asyncHandler(__CART_CONTROLLER__.getCartById));
rootRouter.post("/addProductToCart", asyncHandler(__CART_CONTROLLER__.addProductToCart));
rootRouter.delete("/deleteCart", asyncHandler(__CART_CONTROLLER__.deleteCart));
rootRouter.delete("/deleteProductFromCart", asyncHandler(__CART_CONTROLLER__.deleteProductFromCart));

module.exports = rootRouter;
