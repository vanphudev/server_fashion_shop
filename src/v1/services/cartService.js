"use strict";
const {is} = require("useragent");
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

         const gio_hang_data = gio_hang.gio_hang_hasMany_chi_tiet.map((item) => {
            let thuoc_tinh_san_pham = item.ma_thuoc_tinh_belongto_thuoc_tinh;
            const san_pham = thuoc_tinh_san_pham.thuoc_tinh_san_pham_belongsto_san_pham;
            const mau_sac = thuoc_tinh_san_pham.thuoc_tinh_san_pham_belongsto_mau_sac;
            const kich_thuoc = thuoc_tinh_san_pham.thuoc_tinh_san_pham_belongsto_kich_thuoc;
            thuoc_tinh_san_pham = {
               ...thuoc_tinh_san_pham.toJSON(),
               thuoc_tinh_san_pham_belongsto_san_pham: undefined,
               thuoc_tinh_san_pham_belongsto_mau_sac: undefined,
               thuoc_tinh_san_pham_belongsto_kich_thuoc: undefined,
               so_luong: item.so_luong,
               san_pham: san_pham.toJSON(),
               mau_sac: mau_sac.toJSON(),
               kich_thuoc: kich_thuoc.toJSON(),
            };
            return {
               ...gio_hang.toJSON(),
               ...item.toJSON(),
               thuoc_tinh_san_pham,
               gio_hang_hasMany_chi_tiet: undefined,
               ma_thuoc_tinh_belongto_thuoc_tinh: undefined,
               thuoc_tinh_san_pham_belongsto_san_pham: undefined,
               thuoc_tinh_san_pham_belongsto_mau_sac: undefined,
               thuoc_tinh_san_pham_belongsto_kich_thuoc: undefined,
            };
         });

         return {
            gio_hang: gio_hang_data,
            total: gio_hang_data.length,
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

const addProductToCart = async ({keyStore, body}) => {
   if (!keyStore || !body) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi thêm sản phẩm vào giỏ hàng - Error adding product to cart - Missing required fields in request",
         suggestion: "Please check again your request",
      });
   }
   const {tai_khoan_id} = keyStore;
   const {ma_thuoc_tinh, so_luong, is_Decrease} = body;
   if (!tai_khoan_id || !ma_thuoc_tinh || !so_luong) {
      throw new __RESPONSE.BadRequestError({
         message:
            "Lỗi thêm sản phẩm vào giỏ hàng - Error adding product to cart - Missing required fields" +
            JSON.stringify(body),
         suggestion: "Please check again your request",
      });
   }
   if (so_luong < 1) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi thêm sản phẩm vào giỏ hàng - Error adding product to cart - So luong phai lon hon 0",
         suggestion: "Please check again your request",
      });
   }

   if (!Number.isInteger(so_luong)) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi thêm sản phẩm vào giỏ hàng - Error adding product to cart - So luong phai la so nguyen",
         suggestion: "Please check again your request",
      });
   }

   const khach_hang = await db.khach_hang.findOne({where: {tai_khoan_id}});
   if (!khach_hang) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi thêm sản phẩm vào giỏ hàng - Error adding product to cart - Khach hang not found",
         suggestion: "Please check again your request",
      });
   }

   const gio_hang = await db.gio_hang.findOne({where: {ma_khach_hang: khach_hang.ma_khach_hang}});
   if (!gio_hang) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi thêm sản phẩm vào giỏ hàng - Error adding product to cart - Gio hang not found",
         suggestion: "Please check again your request",
      });
   }

   const thuoc_tinh_san_pham = await db.thuoc_tinh_san_pham.findOne({where: {ma_thuoc_tinh}});
   if (!thuoc_tinh_san_pham) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi thêm sản phẩm vào giỏ hàng - Error adding product to cart - Thuoc tinh san pham not found",
         suggestion: "Please check again your request",
      });
   }

   if (thuoc_tinh_san_pham.so_luong_ton < so_luong) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi thêm sản phẩm vào giỏ hàng - Error adding product to cart - So luong ton khong du",
         suggestion: "Please check again your request",
      });
   }

   const chi_tiet_gio_hang = await db.chi_tiet_gio_hang.findOne({
      where: {ma_thuoc_tinh: thuoc_tinh_san_pham.ma_thuoc_tinh, ma_gio_hang: gio_hang.ma_gio_hang},
   });

   if (is_Decrease) {
      if (chi_tiet_gio_hang) {
         if (chi_tiet_gio_hang.so_luong > 1) {
            chi_tiet_gio_hang.so_luong -= 1;
            await chi_tiet_gio_hang.save();
            return await getCartById({keyStore});
         }
         await chi_tiet_gio_hang.destroy();
         return await getCartById({keyStore});
      }
      return await getCartById({keyStore});
   }

   if (chi_tiet_gio_hang) {
      chi_tiet_gio_hang.so_luong += so_luong;
      await chi_tiet_gio_hang.save();
      return await getCartById({keyStore});
   }

   await db.chi_tiet_gio_hang.create({
      ma_gio_hang: gio_hang.ma_gio_hang,
      ma_thuoc_tinh,
      so_luong,
      ma_khach_hang: khach_hang.ma_khach_hang,
   });

   return await getCartById({keyStore});
};

const deleteCart = async ({keyStore}) => {
   if (!keyStore) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi xóa giỏ hàng - Error deleting cart",
         suggestion: "Please check again your request",
      });
   }
   const {tai_khoan_id} = keyStore;
   if (!tai_khoan_id) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi xóa giỏ hàng - Error deleting cart",
         suggestion: "Please check again your request",
      });
   }
   const khach_hang = await db.khach_hang.findOne({where: {tai_khoan_id}});
   if (!khach_hang) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi xóa giỏ hàng - Error deleting cart",
         suggestion: "Please check again your request",
      });
   }
   const gio_hang = await db.gio_hang.findOne({where: {ma_khach_hang: khach_hang.ma_khach_hang}});
   if (!gio_hang) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi xóa giỏ hàng - Error deleting cart",
         suggestion: "Please check again your request",
      });
   }
   await db.chi_tiet_gio_hang.destroy({where: {ma_gio_hang: gio_hang.ma_gio_hang}});
   return await getCartById({keyStore});
};

const deleteProductFromCart = async ({keyStore, body}) => {
   if (!keyStore || !body) {
      throw new __RESPONSE.BadRequestError({
         message:
            "Lỗi xóa sản phẩm khỏi giỏ hàng - Error deleting product from cart - Missing required fields in request",
         suggestion: "Please check again your request",
      });
   }
   const {tai_khoan_id} = keyStore;
   const {ma_thuoc_tinh} = body;
   if (!tai_khoan_id || !ma_thuoc_tinh) {
      throw new __RESPONSE.BadRequestError({
         message:
            "Lỗi xóa sản phẩm khỏi giỏ hàng - Error deleting product from cart - Missing required fields" +
            JSON.stringify(body),
         suggestion: "Please check again your request",
      });
   }

   const khach_hang = await db.khach_hang.findOne({where: {tai_khoan_id}});
   if (!khach_hang) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi xóa sản phẩm khỏi giỏ hàng - Error deleting product from cart - Khach hang not found",
         suggestion: "Please check again your request",
      });
   }

   const gio_hang = await db.gio_hang.findOne({where: {ma_khach_hang: khach_hang.ma_khach_hang}});
   if (!gio_hang) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi xóa sản phẩm khỏi giỏ hàng - Error deleting product from cart - Gio hang not found",
         suggestion: "Please check again your request",
      });
   }

   const thuoc_tinh_san_pham = await db.thuoc_tinh_san_pham.findOne({where: {ma_thuoc_tinh}});
   if (!thuoc_tinh_san_pham) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi xóa sản phẩm khỏi giỏ hàng - Error deleting product from cart - Thuoc tinh san pham not found",
         suggestion: "Please check again your request",
      });
   }

   const chi_tiet_gio_hang = await db.chi_tiet_gio_hang.findOne({
      where: {ma_thuoc_tinh, ma_gio_hang: gio_hang.ma_gio_hang},
   });

   if (chi_tiet_gio_hang) {
      await chi_tiet_gio_hang.destroy();
   }

   return await getCartById({keyStore});
};

module.exports = {
   getCartById,
   addProductToCart,
   deleteCart,
   deleteProductFromCart,
};
