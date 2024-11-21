"use strict";

const __RESPONSE = require("../core");
const {getAllThuongHieu} = require("../services/thuongHieuService");

const __THUONGHIEU_CONTROLLER__ = {
   getAllThuongHieu: async (req, res) => {
      new __RESPONSE.GET({
         message: "Get all thuong_hieus successfully",
         metadata: await getAllThuongHieu(),
         request: req,
      }).send(res);
   },
};

module.exports = __THUONGHIEU_CONTROLLER__;
