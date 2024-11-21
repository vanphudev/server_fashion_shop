const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __SANPHAM_CONTROLLER__ = require("../../controllers/sanPhamController");

rootRouter.get("/getall", asyncHandler(__SANPHAM_CONTROLLER__.getAllSanPham));
rootRouter.get("/getbyid/:id", asyncHandler(__SANPHAM_CONTROLLER__.getSanPhamById));
rootRouter.get("/search", asyncHandler(__SANPHAM_CONTROLLER__.searchSanPham));
rootRouter.get("/tab", asyncHandler(__SANPHAM_CONTROLLER__.sanPhamTab));
rootRouter.get("/lienquan", asyncHandler(__SANPHAM_CONTROLLER__.sanPhamLienQuan));

module.exports = rootRouter;
