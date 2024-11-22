"use strict";

const __RESPONSE = require("../core/");
const {createDanhGia, checkBuyProduct} = require("../services/danhGiaSP");

const __DG_CONTROLLER__ = {
   createDanhGia: async (req, res) => {
      new __RESPONSE.GET({
         message: "Create danh gia successfully",
         metadata: await createDanhGia(req),
         request: req,
      }).send(res);
   },
   checkBuyProduct: async (req, res) => {
      new __RESPONSE.GET({
         message: "Check buy product successfully",
         metadata: await checkBuyProduct(req),
         request: req,
      }).send(res);
   },
};

module.exports = __DG_CONTROLLER__;
