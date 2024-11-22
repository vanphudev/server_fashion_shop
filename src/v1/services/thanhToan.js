"use strict";
const __RESPONSE = require("../core");
const db = require("../models");

const order = async (req, res) => {
   const {ma_khach_hang, address, phone, trang_thai_giao_hang, items, ma_khuyen_mai, paymentMethod, totalPrice} =
      req.body;

   return await db.sequelize
      .transaction(async (t) => {
         // Tạo hóa đơn với OUTPUT INTO
         const hoa_don_result = await db.sequelize.query(
            `
            DECLARE @InsertedData TABLE (
               ma_hoa_don INT
            );

            INSERT INTO hoa_don (
               ma_khach_hang,
               ma_phuong_thuc,
               dia_chi_giao_hang,
               phone_giao_hang,
               ma_khuyen_mai,
               trang_thai_giao_hang,
               tong_don_hang,
               hinh_thuc_ban
            )
            OUTPUT INSERTED.ma_hoa_don INTO @InsertedData
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);

            SELECT ma_hoa_don FROM @InsertedData;
            `,
            {
               replacements: [
                  ma_khach_hang,
                  paymentMethod,
                  address,
                  phone,
                  ma_khuyen_mai || null,
                  trang_thai_giao_hang,
                  totalPrice,
                  1,
               ],
               transaction: t,
               type: db.Sequelize.QueryTypes.SELECT,
            }
         );

         const hoa_don = hoa_don_result[0];

         for (let i = 0; i < items.length; i++) {
            await db.sequelize.query(
               `
               DECLARE @InsertedDetails TABLE (
                  ma_hoa_don INT,
                  ma_thuoc_tinh INT,
                  so_luong INT,
                  gia DECIMAL(18, 2)
               );
         
               INSERT INTO chi_tiet_hoa_don (
                  ma_hoa_don,
                  ma_thuoc_tinh,
                  so_luong,
                  gia
               )
               OUTPUT INSERTED.ma_hoa_don, INSERTED.ma_thuoc_tinh, INSERTED.so_luong, INSERTED.gia INTO @InsertedDetails
               VALUES (?, ?, ?, ?);
         
               SELECT * FROM @InsertedDetails;
               `,
               {
                  replacements: [hoa_don.ma_hoa_don, items[i].ma_thuoc_tinh, items[i].so_luong, items[i].gia_ban],
                  transaction: t,
                  type: db.Sequelize.QueryTypes.SELECT,
               }
            );
         }

         // lláy giỏ hàng của khách hàng
         const gio_hang = await db.gio_hang.findOne({
            where: {
               ma_khach_hang: ma_khach_hang,
            },
         });

         await db.chi_tiet_gio_hang.destroy({
            where: {
               ma_gio_hang: gio_hang.ma_gio_hang,
            },
            transaction: t,
         });

         return {
            hoa_don: hoa_don,
         };
      })
      .then((hoa_don) => {
         return {
            hoa_don: hoa_don,
         };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const getOrders = async (req, res) => {
   const {ma_hoa_don} = req.params;
   if (!ma_hoa_don) {
      throw new __RESPONSE.BadRequestError({
         message: "ma_hoa_don is required",
         suggestion: "Please check your request",
         request: req,
      });
   }
   return await db.hoa_don
      .findAll({
         where: {
            ma_hoa_don: ma_hoa_don,
         },
         include: [
            {
               model: db.chi_tiet_hoa_don,
               as: "hoa_don_hasMany_chi_tiet",
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
            {
               model: db.phuong_thuc_thanh_toan,
               as: "ma_phuong_thuc_belongto_phuong_thuc",
            },
            {
               model: db.khach_hang,
               as: "ma_khach_hang_belongto_khach_hang",
            }
         ],
      })
      .then((hoa_don) => {
         if (!hoa_don) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found hoa_don",
               suggestion: "Please check your request",
               request: req,
            });
         }

         return {
            hoa_don: hoa_don,
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
   order,
   getOrders,
};
