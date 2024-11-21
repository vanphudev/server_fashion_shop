const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __NHOMLOAI_CONTROLLER__ = require("../../controllers/nhomLoaiController");

rootRouter.get("/getall", asyncHandler(__NHOMLOAI_CONTROLLER__.getAllNhomLoai));

module.exports = rootRouter;
