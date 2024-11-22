"use strict";
const __RESPONSE = require("../core");
const {Op} = require("sequelize");
const db = require("../models");
const khuyen_mai = require("../models/khuyen_mai");

const getAllKhuyenMai = async (req, res) => {
   return await db.khuyen_mai
      .findAll({
         where: {
            tinh_trang: {[Op.like]: "active"},
            thoi_gian_bat_dau: {
               [Op.lte]: new Date(),
            },
            thoi_gian_ket_thuc: {
               [Op.gte]: new Date(),
            },
         },
      })
      .then((khuyen_mais) => {
         if (!khuyen_mais) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found khuyen_mais",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {
            khuyen_mais: khuyen_mais,
            total: khuyen_mais.length,
         };
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         console.log(error);
         throw new __RESPONSE.BadRequestError({
            message: error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const getKhuyenMaiById = async (req, res) => {
   const {ma_khuyen_mai} = req.params;
   return await db.khuyen_mai
      .findOne({
         where: {
            ma_khuyen_mai: ma_khuyen_mai,
            tinh_trang: {[Op.iLike]: "active"},
            thoi_gian_bat_dau: {
               [Op.lte]: new Date(),
            },
            thoi_gian_ket_thuc: {
               [Op.gte]: new Date(),
            },
         },
      })
      .then((khuyen_mai) => {
         if (!khuyen_mai) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found khuyen_mai",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {
            khuyen_mai: khuyen_mai,
         };
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const checkKhuyenMai = async (req, res) => {
   const {code, tong_tien} = req.body;
   if (!code) {
      throw new __RESPONSE.BadRequestError({
         message: "code is required",
         suggestion: "Please check your request",
         request: req,
      });
   }
   return await db.khuyen_mai
      .findOne({
         where: {
            code,
         },
      })
      .then((KM) => {
         if (!KM) {
            throw new __RESPONSE.NotFoundError({
               message: "Không tìm thấy mã khuyến mãi",
               suggestion: "Vui lòng kiểm tra lại mã khuyến mãi",
               request: req,
            });
         }

         if (KM.so_luong_da_dung >= KM.so_luong_toi_da) {
            throw new __RESPONSE.BadRequestError({
               message: "Mã khuyến mãi đã hết lượt sử dụng",
               suggestion: "Vui lòng kiểm tra lại mã khuyến mãi",
               request: req,
            });
         }

         if (KM.gia_tri_hoa_don_toi_thieu > tong_tien) {
            throw new __RESPONSE.BadRequestError({
               message: "Tổng tiền không đạt yêu cầu tối thiểu",
               suggestion: "Vui lòng kiểm tra lại đơn hàng",
               request: req,
            });
         }

         if (KM.thoi_gian_ket_thuc < new Date()) {
            throw new __RESPONSE.BadRequestError({
               message: "Mã khuyến mãi đã hết hạn",
               suggestion: "Vui lòng kiểm tra lại mã khuyến mãi",
               request: req,
            });
         }

         if (KM.thoi_gian_bat_dau > new Date()) {
            throw new __RESPONSE.BadRequestError({
               message: "Mã khuyến mãi chưa được kích hoạt",
               suggestion: "Vui lòng kiểm tra lại mã khuyến mãi",
               request: req,
            });
         }

         if (KM.tinh_trang != "active" && KM.tinh_trang != "Active") {
            throw new __RESPONSE.BadRequestError({
               message: "Mã khuyến mãi không còn hoạt động",
               suggestion: "Vui lòng kiểm tra lại mã khuyến mãi",
               request: req,
            });
         }
         return {
            khuyen_mai: KM,
         };
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

module.exports = {
   getAllKhuyenMai,
   getKhuyenMaiById,
   checkKhuyenMai,
};
