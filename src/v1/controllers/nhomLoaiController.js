"use strict";

const __RESPONSE = require("../core/");
const {getAllNhomLoai} = require("../services/nhomLoaiService");

const __NHOMLOAI_CONTROLLER__ = {
   getAllNhomLoai: async (req, res) => {
      new __RESPONSE.GET({
         message: "Get all nhom_loai successfully",
         metadata: await getAllNhomLoai(),
         request: req,
      }).send(res);
   },
};

module.exports = __NHOMLOAI_CONTROLLER__;
