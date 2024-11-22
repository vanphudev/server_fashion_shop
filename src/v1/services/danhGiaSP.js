"use strict";
const __RESPONSE = require("../core");
const db = require("../models");

const createDanhGia = async ({keyStore, body}) => {
   const {so_sao, noi_dung, ma_san_pham} = body;
   if (!so_sao || !noi_dung || !ma_san_pham) {
      throw new __RESPONSE.BadRequestError({
         message: "Missing required fields",
         suggestion: "Please check your request",
         request: req,
      });
   }
   const {tai_khoan_id} = keyStore;
   const khach_hang = await db.khach_hang.findOne({
      where: {
         tai_khoan_id: tai_khoan_id,
      },
   });
   if (!khach_hang) {
      throw new __RESPONSE.NotFoundError({
         message: "Not found khach_hang",
         suggestion: "Please check your request",
         request: req,
      });
   }

   const checkDanhGia = await db.danh_gia_san_pham.findOne({
      where: {
         ma_san_pham: ma_san_pham,
         tai_khoan_id: tai_khoan_id,
      },
   });

   if (checkDanhGia) {
      throw new __RESPONSE.BadRequestError({
         message: "Bạn đã đánh giá sản phẩm này rồi !",
         suggestion: "Please check your request",
      });
   }

   const check = await db.hoa_don.findOne({
      where: {
         ma_khach_hang: khach_hang.ma_khach_hang,
      },
      include: [
         {
            model: db.chi_tiet_hoa_don,
            as: "hoa_don_hasMany_chi_tiet",
            include: [
               {
                  model: db.thuoc_tinh_san_pham,
                  as: "ma_thuoc_tinh_belongto_thuoc_tinh",
                  where: {
                     ma_san_pham: ma_san_pham,
                  },
               },
            ],
         },
      ],
   });

   if (!check) {
      throw new __RESPONSE.BadRequestError({
         message: "Bạn chưa mua sản phẩm này !",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await db.danh_gia_san_pham
      .create({
         ma_san_pham: ma_san_pham,
         tai_khoan_id: tai_khoan_id,
         noi_dung: noi_dung,
         diem_danh_gia: so_sao,
      })
      .then((danh_gia_san_pham) => {
         if (!danh_gia_san_pham) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found danh_gia_san_pham",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {
            danh_gia_san_pham: danh_gia_san_pham,
         };
      })
      .catch((error) => {
         console.log(error);
         throw new __RESPONSE.BadRequestError({
            message: error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const checkBuyProduct = async (req, res) => {
   const {ma_san_pham, tai_khoan_id} = req.body;
   if (!ma_san_pham || !tai_khoan_id) {
      throw new __RESPONSE.BadRequestError({
         message: "Missing required fields",
         suggestion: "Please check your request",
         request: req,
      });
   }

   const khach_hang = await db.khach_hang.findOne({
      where: {
         tai_khoan_id: tai_khoan_id,
      },
   });
   if (!khach_hang) {
      throw new __RESPONSE.NotFoundError({
         message: "Not found khach_hang",
         suggestion: "Please check your request",
         request: req,
      });
   }

   const check = await db.hoa_don.findOne({
      where: {
         ma_khach_hang: khach_hang.ma_khach_hang,
      },
      include: [
         {
            model: db.chi_tiet_hoa_don,
            as: "hoa_don_hasMany_chi_tiet",
            include: [
               {
                  model: db.thuoc_tinh_san_pham,
                  as: "ma_thuoc_tinh_belongto_thuoc_tinh",
                  where: {
                     ma_san_pham: ma_san_pham,
                  },
               },
            ],
         },
      ],
   });

   if (!check) {
      throw new __RESPONSE.BadRequestError({
         message: "Bạn chưa mua sản phẩm này !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   return {
      check,
   };
};

module.exports = {
   createDanhGia,
   checkBuyProduct,
};
