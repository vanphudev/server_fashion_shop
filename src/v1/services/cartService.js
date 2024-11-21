"use strict";
const __RESPONSE = require("../core");
const db = require("../models");

const getCartById = async ({keyStore}) => {
   if (!keyStore) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi tìm giỏ hàng - Error finding cart",
         suggestion: "Please check again your request",
      });
   }
   const {tai_khoan_id} = keyStore;
   if (!tai_khoan_id) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi tìm giỏ hàng - Error finding cart",
         suggestion: "Please check again your request",
      });
   }
   const khach_hang = await db.khach_hang.findOne({where: {tai_khoan_id}});
   if (!khach_hang) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi tìm giỏ hàng - Error finding cart",
         suggestion: "Please check again your request",
      });
   }
   return await db.gio_hang
      .findOne({
         where: {ma_khach_hang: khach_hang.ma_khach_hang},
         include: [
            {
               model: db.chi_tiet_gio_hang,
               as: "gio_hang_hasMany_chi_tiet",
               include: [
                  {
                     model: db.thuoc_tinh_san_pham,
                     as: "ma_thuoc_tinh_belongto_thuoc_tinh",
                     include: [
                        {
                           model: db.san_pham,
                           as: "thuoc_tinh_san_pham_belongsto_san_pham",
                        },
                        {
                           model: db.mau_sac,
                           as: "thuoc_tinh_san_pham_belongsto_mau_sac",
                        },
                        {
                           model: db.kich_thuoc,
                           as: "thuoc_tinh_san_pham_belongsto_kich_thuoc",
                        },
                     ],
                  },
               ],
            },
         ],
      })
      .then((gio_hang) => {
         if (!gio_hang) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found gio_hang",
               suggestion: "Please check your request",
            });
         }
         // console.log("gio_hang_hasMany_chi_tiet", gio_hang.gio_hang_hasMany_chi_tiet);
         // console.log("gio_hang_hasMany_chi_tiet", gio_hang.gio_hang_hasMany_chi_tiet);
         // const thuoc_tinh_san_pham = gio_hang.ma_thuoc_tinh_belongto_thuoc_tinh;
         // console.log("thuoc_tinh_san_pham", thuoc_tinh_san_pham);
         // const san_pham = thuoc_tinh_san_pham.thuoc_tinh_san_pham_belongsto_san_pham;
         // const mau_sac = thuoc_tinh_san_pham.thuoc_tinh_san_pham_belongsto_mau_sac;
         // const kich_thuoc = thuoc_tinh_san_pham.thuoc_tinh_san_pham_belongsto_kich_thuoc;

         // const gio_hang_data = {
         //    ...gio_hang.toJSON(),
         //    thuoc_tinh_san_pham,
         //    san_pham,
         //    mau_sac,
         //    kich_thuoc,
         //    ma_thuoc_tinh_belongto_thuoc_tinh: undefined,
         //    thuoc_tinh_san_pham_belongsto_san_pham: undefined,
         //    thuoc_tinh_san_pham_belongsto_mau_sac: undefined,
         //    thuoc_tinh_san_pham_belongsto_kich_thuoc: undefined,
         // };

         return {
            gio_hang: gio_hang,
            total: gio_hang.length,
         };
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: error.message,
            suggestion: "Please check your request",
         });
      });
};

module.exports = {
   getCartById,
};
