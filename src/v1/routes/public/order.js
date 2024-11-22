const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __ORDER_CONTROLLER__ = require("../../controllers/orderController");

rootRouter.get("/getOrders/:ma_hoa_don", asyncHandler(__ORDER_CONTROLLER__.getOrders));

module.exports = rootRouter;
