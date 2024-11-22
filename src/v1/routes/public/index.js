"use strict";
const express = require("express");
const publicRouter = express.Router();

publicRouter.use("/nhom_loai", require("./nhomLoaiAPI"));
publicRouter.use("/san_pham", require("./sanPhamAPI"));
publicRouter.use("/thuong_hieu", require("./thuongHieuAPI"));
publicRouter.use("/auth", require("./auth"));
publicRouter.use("/khuyen_mai", require("./khuyenMaiApi"));
publicRouter.use("/phuong_thuc_thanh_toan", require("./payApi"));
publicRouter.use("/hoa_don", require("./order"));

module.exports = publicRouter;
