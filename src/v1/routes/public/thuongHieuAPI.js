const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __THUONGHIEU_CONTROLLER__ = require("../../controllers/thuongHieuController");

rootRouter.get("/getall", asyncHandler(__THUONGHIEU_CONTROLLER__.getAllThuongHieu));

module.exports = rootRouter;
