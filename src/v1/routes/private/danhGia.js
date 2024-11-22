const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __DG_CONTROLLER__ = require("../../controllers/danhgiaController");

rootRouter.post("/addDanhGia", asyncHandler(__DG_CONTROLLER__.createDanhGia));
rootRouter.post("/checkBuyProduct", asyncHandler(__DG_CONTROLLER__.checkBuyProduct));

module.exports = rootRouter;
