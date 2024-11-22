"use strict";

const __RESPONSE = require("../core/");
const {getAllKhuyenMai, getKhuyenMaiById, checkKhuyenMai} = require("../services/khuyenMaiService");

const __KM_CONTROLLER__ = {
   getAllKhuyenMai: async (req, res) => {
      new __RESPONSE.GET({
         message: "Get all khuyen mai successfully !",
         metadata: await getAllKhuyenMai(),
         request: req,
      }).send(res);
   },
   checkKhuyenMai: async (req, res) => {
      new __RESPONSE.GET({
         message: "Check khuyen mai successfully !",
         metadata: await checkKhuyenMai(req, res),
         request: req,
      }).send(res);
   },
};

module.exports = __KM_CONTROLLER__;
