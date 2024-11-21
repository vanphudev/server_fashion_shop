"use strict";

const __RESPONSE = require("../core/");
const {
   getAllSanPham,
   getSanPhamById,
   searchSanPham,
   sanPhamTab,
   sanPhamLienQuan,
} = require("../services/sanphamService");

const __SANPHAM_CONTROLLER__ = {
   getAllSanPham: async (req, res) => {
      new __RESPONSE.GET({
         message: "Get all san_pham successfully",
         metadata: await getAllSanPham(),
         request: req,
      }).send(res);
   },
   getSanPhamById: async (req, res) => {
      new __RESPONSE.GET({
         message: "Get san_pham by id successfully",
         metadata: await getSanPhamById(req),
         request: req,
      }).send(res);
   },
   searchSanPham: async (req, res) => {
      new __RESPONSE.GET({
         message: "Search san_pham successfully",
         metadata: await searchSanPham(req),
         request: req,
      }).send(res);
   },
   sanPhamTab: async (req, res) => {
      new __RESPONSE.GET({
         message: "Get san_pham tab successfully",
         metadata: await sanPhamTab(req),
         request: req,
      }).send(res);
   },
   sanPhamLienQuan: async (req, res) => {
      new __RESPONSE.GET({
         message: "Get san_pham lien quan successfully",
         metadata: await sanPhamLienQuan(req),
         request: req,
      }).send(res);
   },
};

module.exports = __SANPHAM_CONTROLLER__;
