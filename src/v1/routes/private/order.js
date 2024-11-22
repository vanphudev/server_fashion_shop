const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __ORDER_CONTROLLER__ = require("../../controllers/orderController");

rootRouter.post("/order", asyncHandler(__ORDER_CONTROLLER__.order));

module.exports = rootRouter;
