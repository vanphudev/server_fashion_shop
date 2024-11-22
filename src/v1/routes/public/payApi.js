const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __PM_CONTROLLER__ = require("../../controllers/paymentController");

rootRouter.get("/getall", asyncHandler(__PM_CONTROLLER__.getAllPaments));

module.exports = rootRouter;
