const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __KM_CONTROLLER__ = require("../../controllers/khuyenMaiController");

rootRouter.post("/checkvarKM", asyncHandler(__KM_CONTROLLER__.checkKhuyenMai));
rootRouter.get("/getall", asyncHandler(__KM_CONTROLLER__.getAllKhuyenMai));

module.exports = rootRouter;
