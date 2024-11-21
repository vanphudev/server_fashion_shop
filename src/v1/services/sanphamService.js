"use strict";
const __RESPONSE = require("../core");
const {Sequelize, Op, where} = require("sequelize");
const db = require("../models");

const getAllSanPham = async (req, res) => {
   return await db.san_pham
      .findAll({
         where: {
            hinh_thuc_ban: 1,
         },
         include: [
            {
               model: db.loai_san_pham,
               as: "san_pham_belongsto_loai_san_pham",
               include: [
                  {
                     model: db.nhom_loai,
                     as: "loai_san_pham_belongto_nhom_loai",
                  },
               ],
            },
            {
               model: db.thuoc_tinh_san_pham,
               as: "san_pham_hasmany_thuoc_tinh_san_pham",
            },
            {
               model: db.danh_gia_san_pham,
               as: "san_pham_hasmany_danh_gia_san_pham",
            },
            {
               model: db.thuong_hieu,
               as: "san_pham_belongsto_thuong_hieu",
            },
         ],
      })
      .then((san_phams) => {
         if (!san_phams) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found san_phams",
               suggestion: "Please check your request",
               request: req,
            });
         }

         const result = san_phams.map((product) => {
            const loaiSanPham = product.san_pham_belongsto_loai_san_pham;
            const nhomLoai = loaiSanPham?.loai_san_pham_belongto_nhom_loai;
            const prices = product.san_pham_hasmany_thuoc_tinh_san_pham.map((tt) => tt.gia_ban);
            const giaCaoNhat = Math.max(...prices);
            const giaThapNhat = Math.min(...prices);
            const allOutOfStock = product.san_pham_hasmany_thuoc_tinh_san_pham.every((tt) => tt.inventory <= 0);
            return {
               ...product.toJSON(),
               gia_cao_nhat: giaCaoNhat,
               danh_gia_san_pham: product.san_pham_hasmany_danh_gia_san_pham,
               san_pham_hasmany_danh_gia_san_pham: undefined,
               thuong_hieu: product.san_pham_belongsto_thuong_hieu,
               san_pham_belongsto_thuong_hieu: undefined,
               thuoc_tinh_san_pham: product.san_pham_hasmany_thuoc_tinh_san_pham,
               san_pham_belongsto_loai_san_pham: undefined,
               san_pham_hasmany_thuoc_tinh_san_pham: undefined,
               gia_thap_nhat: giaThapNhat,
               nhom_loai: nhomLoai,
               allOutOfStock,
               loai_san_pham: {
                  ...loaiSanPham.toJSON(),
                  loai_san_pham_belongto_nhom_loai: undefined,
               },
            };
         });

         return {
            san_phams: result,
            total: result.length,
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

const getSanPhamById = async (req, res) => {
   const id = req.params.id;
   if (!id) {
      throw new __RESPONSE.BadRequestError({
         message: "Missing id in request",
         suggestion: "Please check your request",
         request: req,
      });
   }
   return await db.san_pham
      .findAll({
         where: {
            slug: id,
            hinh_thuc_ban: 1,
         },
         include: [
            {
               model: db.loai_san_pham,
               as: "san_pham_belongsto_loai_san_pham",
               include: [
                  {
                     model: db.nhom_loai,
                     as: "loai_san_pham_belongto_nhom_loai",
                  },
               ],
            },
            {
               model: db.thuoc_tinh_san_pham,
               as: "san_pham_hasmany_thuoc_tinh_san_pham",
            },
            {
               model: db.danh_gia_san_pham,
               as: "san_pham_hasmany_danh_gia_san_pham",
            },
            {
               model: db.hinh_anh_san_pham,
               as: "san_pham_hasmany_hinh_anh_san_pham",
            },
            {
               model: db.thong_tin_san_pham,
               as: "san_pham_hasmany_thong_tin_san_pham",
            },
            {
               model: db.thuong_hieu,
               as: "san_pham_belongsto_thuong_hieu",
            },
         ],
      })
      .then((san_phams) => {
         if (!san_phams) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found san_phams",
               suggestion: "Please check your request",
               request: req,
            });
         }

         const result = san_phams.map((product) => {
            const loaiSanPham = product.san_pham_belongsto_loai_san_pham;
            const nhomLoai = loaiSanPham?.loai_san_pham_belongto_nhom_loai;
            const prices = product.san_pham_hasmany_thuoc_tinh_san_pham.map((tt) => tt.gia_ban);
            const giaCaoNhat = Math.max(...prices);
            const giaThapNhat = Math.min(...prices);
            const allOutOfStock = product.san_pham_hasmany_thuoc_tinh_san_pham.every((tt) => tt.inventory <= 0);
            return {
               ...product.toJSON(),
               gia_cao_nhat: giaCaoNhat,
               hinh_anh_san_pham: product.san_pham_hasmany_hinh_anh_san_pham,
               san_pham_hasmany_hinh_anh_san_pham: undefined,
               thong_tin_san_pham: product.san_pham_hasmany_thong_tin_san_pham,
               san_pham_hasmany_thong_tin_san_pham: undefined,
               danh_gia_san_pham: product.san_pham_hasmany_danh_gia_san_pham,
               san_pham_hasmany_danh_gia_san_pham: undefined,
               thuong_hieu: product.san_pham_belongsto_thuong_hieu,
               san_pham_belongsto_thuong_hieu: undefined,
               thuoc_tinh_san_pham: product.san_pham_hasmany_thuoc_tinh_san_pham,
               san_pham_belongsto_loai_san_pham: undefined,
               san_pham_hasmany_thuoc_tinh_san_pham: undefined,
               gia_thap_nhat: giaThapNhat,
               nhom_loai: nhomLoai,
               allOutOfStock,
               loai_san_pham: {
                  ...loaiSanPham.toJSON(),
                  loai_san_pham_belongto_nhom_loai: undefined,
               },
            };
         });
         return {
            san_pham: result,
            total: result.length,
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

const searchSanPham = async (req, res) => {
   const search = req.query.search;
   if (!search) {
      throw new __RESPONSE.BadRequestError({
         message: "Missing search term in request",
         suggestion: "Please check your request",
         request: req,
      });
   }
   return await db.san_pham
      .findAll({
         where: {
            ten_san_pham: {
               [Op.like]: `%${search}%`,
            },
         },
         include: [
            {
               model: db.loai_san_pham,
               as: "san_pham_belongsto_loai_san_pham",
               include: [
                  {
                     model: db.nhom_loai,
                     as: "loai_san_pham_belongto_nhom_loai",
                  },
               ],
            },
            {
               model: db.thuoc_tinh_san_pham,
               as: "san_pham_hasmany_thuoc_tinh_san_pham",
            },
            {
               model: db.danh_gia_san_pham,
               as: "san_pham_hasmany_danh_gia_san_pham",
            },
            {
               model: db.hinh_anh_san_pham,
               as: "san_pham_hasmany_hinh_anh_san_pham",
            },
            {
               model: db.thong_tin_san_pham,
               as: "san_pham_hasmany_thong_tin_san_pham",
            },
            {
               model: db.thuong_hieu,
               as: "san_pham_belongsto_thuong_hieu",
            },
         ],
      })
      .then((san_phams) => {
         if (!san_phams) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found san_phams",
               suggestion: "Please check your request",
               request: req,
            });
         }

         const result = san_phams.map((product) => {
            const loaiSanPham = product.san_pham_belongsto_loai_san_pham;
            const nhomLoai = loaiSanPham?.loai_san_pham_belongto_nhom_loai;

            const prices = product.san_pham_hasmany_thuoc_tinh_san_pham.map((tt) => tt.gia_ban);
            const giaCaoNhat = Math.max(...prices);
            const giaThapNhat = Math.min(...prices);
            const allOutOfStock = product.san_pham_hasmany_thuoc_tinh_san_pham.every((tt) => tt.inventory <= 0);
            return {
               ...product.toJSON(),
               gia_cao_nhat: giaCaoNhat,
               hinh_anh_san_pham: product.san_pham_hasmany_hinh_anh_san_pham,
               san_pham_hasmany_hinh_anh_san_pham: undefined,
               thong_tin_san_pham: product.san_pham_hasmany_thong_tin_san_pham,
               san_pham_hasmany_thong_tin_san_pham: undefined,
               danh_gia_san_pham: product.san_pham_hasmany_danh_gia_san_pham,
               san_pham_hasmany_danh_gia_san_pham: undefined,
               thuong_hieu: product.san_pham_belongsto_thuong_hieu,
               san_pham_belongsto_thuong_hieu: undefined,
               thuoc_tinh_san_pham: product.san_pham_hasmany_thuoc_tinh_san_pham,
               san_pham_belongsto_loai_san_pham: undefined,
               san_pham_hasmany_thuoc_tinh_san_pham: undefined,
               gia_thap_nhat: giaThapNhat,
               nhom_loai: nhomLoai,
               allOutOfStock,
               loai_san_pham: {
                  ...loaiSanPham.toJSON(),
                  loai_san_pham_belongto_nhom_loai: undefined,
               },
            };
         });

         return {
            san_phams: result,
            total: result.length,
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

const sanPhamTab = async (req, res) => {
   const valueTab = req.query.valueTab;
   if (!valueTab) {
      throw new __RESPONSE.BadRequestError({
         message: "Missing search term in request",
         suggestion: "Please check your request",
         request: req,
      });
   }

   if (valueTab === "new") {
      return await db.san_pham
         .findAll({
            order: [["created_at", "DESC"]],
            limit: 4,
            hinh_thuc_ban: 1,
            include: [
               {
                  model: db.loai_san_pham,
                  as: "san_pham_belongsto_loai_san_pham",
                  include: [
                     {
                        model: db.nhom_loai,
                        as: "loai_san_pham_belongto_nhom_loai",
                     },
                  ],
               },
               {
                  model: db.thuoc_tinh_san_pham,
                  as: "san_pham_hasmany_thuoc_tinh_san_pham",
               },
               {
                  model: db.danh_gia_san_pham,
                  as: "san_pham_hasmany_danh_gia_san_pham",
               },
               {
                  model: db.hinh_anh_san_pham,
                  as: "san_pham_hasmany_hinh_anh_san_pham",
               },
               {
                  model: db.thong_tin_san_pham,
                  as: "san_pham_hasmany_thong_tin_san_pham",
               },
               {
                  model: db.thuong_hieu,
                  as: "san_pham_belongsto_thuong_hieu",
               },
            ],
         })
         .then((san_phams) => {
            if (!san_phams) {
               throw new __RESPONSE.NotFoundError({
                  message: "Not found san_phams",
                  suggestion: "Please check your request",
                  request: req,
               });
            }

            const result = san_phams.map((product) => {
               const loaiSanPham = product.san_pham_belongsto_loai_san_pham;
               const nhomLoai = loaiSanPham?.loai_san_pham_belongto_nhom_loai;

               const prices = product.san_pham_hasmany_thuoc_tinh_san_pham.map((tt) => tt.gia_ban);
               const giaCaoNhat = Math.max(...prices);
               const giaThapNhat = Math.min(...prices);
               const allOutOfStock = product.san_pham_hasmany_thuoc_tinh_san_pham.every((tt) => tt.inventory <= 0);
               return {
                  ...product.toJSON(),
                  gia_cao_nhat: giaCaoNhat,
                  hinh_anh_san_pham: product.san_pham_hasmany_hinh_anh_san_pham,
                  san_pham_hasmany_hinh_anh_san_pham: undefined,
                  thong_tin_san_pham: product.san_pham_hasmany_thong_tin_san_pham,
                  san_pham_hasmany_thong_tin_san_pham: undefined,
                  danh_gia_san_pham: product.san_pham_hasmany_danh_gia_san_pham,
                  san_pham_hasmany_danh_gia_san_pham: undefined,
                  thuong_hieu: product.san_pham_belongsto_thuong_hieu,
                  san_pham_belongsto_thuong_hieu: undefined,
                  thuoc_tinh_san_pham: product.san_pham_hasmany_thuoc_tinh_san_pham,
                  san_pham_belongsto_loai_san_pham: undefined,
                  san_pham_hasmany_thuoc_tinh_san_pham: undefined,
                  gia_thap_nhat: giaThapNhat,
                  nhom_loai: nhomLoai,
                  allOutOfStock,
                  loai_san_pham: {
                     ...loaiSanPham.toJSON(),
                     loai_san_pham_belongto_nhom_loai: undefined,
                  },
               };
            });

            return {
               san_phams: result,
               total: result.length,
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
   }

   if (valueTab === "topSellers") {
      return await db.san_pham
         .findAll({
            order: [["giam_gia", "DESC"]],
            limit: 4,
            hinh_thuc_ban: 1,
            include: [
               {
                  model: db.loai_san_pham,
                  as: "san_pham_belongsto_loai_san_pham",
                  include: [
                     {
                        model: db.nhom_loai,
                        as: "loai_san_pham_belongto_nhom_loai",
                     },
                  ],
               },
               {
                  model: db.thuoc_tinh_san_pham,
                  as: "san_pham_hasmany_thuoc_tinh_san_pham",
               },
               {
                  model: db.danh_gia_san_pham,
                  as: "san_pham_hasmany_danh_gia_san_pham",
               },
               {
                  model: db.hinh_anh_san_pham,
                  as: "san_pham_hasmany_hinh_anh_san_pham",
               },
               {
                  model: db.thong_tin_san_pham,
                  as: "san_pham_hasmany_thong_tin_san_pham",
               },
               {
                  model: db.thuong_hieu,
                  as: "san_pham_belongsto_thuong_hieu",
               },
            ],
         })
         .then((san_phams) => {
            if (!san_phams) {
               throw new __RESPONSE.NotFoundError({
                  message: "Not found san_phams",
                  suggestion: "Please check your request",
                  request: req,
               });
            }

            const result = san_phams.map((product) => {
               const loaiSanPham = product.san_pham_belongsto_loai_san_pham;
               const nhomLoai = loaiSanPham?.loai_san_pham_belongto_nhom_loai;

               const prices = product.san_pham_hasmany_thuoc_tinh_san_pham.map((tt) => tt.gia_ban);
               const giaCaoNhat = Math.max(...prices);
               const giaThapNhat = Math.min(...prices);
               const allOutOfStock = product.san_pham_hasmany_thuoc_tinh_san_pham.every((tt) => tt.inventory <= 0);
               return {
                  ...product.toJSON(),
                  gia_cao_nhat: giaCaoNhat,
                  hinh_anh_san_pham: product.san_pham_hasmany_hinh_anh_san_pham,
                  san_pham_hasmany_hinh_anh_san_pham: undefined,
                  thong_tin_san_pham: product.san_pham_hasmany_thong_tin_san_pham,
                  san_pham_hasmany_thong_tin_san_pham: undefined,
                  danh_gia_san_pham: product.san_pham_hasmany_danh_gia_san_pham,
                  san_pham_hasmany_danh_gia_san_pham: undefined,
                  thuong_hieu: product.san_pham_belongsto_thuong_hieu,
                  san_pham_belongsto_thuong_hieu: undefined,
                  thuoc_tinh_san_pham: product.san_pham_hasmany_thuoc_tinh_san_pham,
                  san_pham_belongsto_loai_san_pham: undefined,
                  san_pham_hasmany_thuoc_tinh_san_pham: undefined,
                  gia_thap_nhat: giaThapNhat,
                  nhom_loai: nhomLoai,
                  allOutOfStock,
                  loai_san_pham: {
                     ...loaiSanPham.toJSON(),
                     loai_san_pham_belongto_nhom_loai: undefined,
                  },
               };
            });

            return {
               san_phams: result,
               total: result.length,
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
   }
   return await db.san_pham
      .findAll({
         limit: 4,
         include: [
            {
               model: db.loai_san_pham,
               as: "san_pham_belongsto_loai_san_pham",
               include: [
                  {
                     model: db.nhom_loai,
                     as: "loai_san_pham_belongto_nhom_loai",
                  },
               ],
            },
            {
               model: db.thuoc_tinh_san_pham,
               as: "san_pham_hasmany_thuoc_tinh_san_pham",
            },
            {
               model: db.danh_gia_san_pham,
               as: "san_pham_hasmany_danh_gia_san_pham",
            },
            {
               model: db.hinh_anh_san_pham,
               as: "san_pham_hasmany_hinh_anh_san_pham",
            },
            {
               model: db.thong_tin_san_pham,
               as: "san_pham_hasmany_thong_tin_san_pham",
            },
            {
               model: db.thuong_hieu,
               as: "san_pham_belongsto_thuong_hieu",
            },
         ],
      })
      .then((san_phams) => {
         if (!san_phams) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found san_phams",
               suggestion: "Please check your request",
               request: req,
            });
         }

         const result = san_phams.map((product) => {
            const loaiSanPham = product.san_pham_belongsto_loai_san_pham;
            const nhomLoai = loaiSanPham?.loai_san_pham_belongto_nhom_loai;

            const prices = product.san_pham_hasmany_thuoc_tinh_san_pham.map((tt) => tt.gia_ban);
            const giaCaoNhat = Math.max(...prices);
            const giaThapNhat = Math.min(...prices);
            const allOutOfStock = product.san_pham_hasmany_thuoc_tinh_san_pham.every((tt) => tt.inventory <= 0);
            return {
               ...product.toJSON(),
               gia_cao_nhat: giaCaoNhat,
               hinh_anh_san_pham: product.san_pham_hasmany_hinh_anh_san_pham,
               san_pham_hasmany_hinh_anh_san_pham: undefined,
               thong_tin_san_pham: product.san_pham_hasmany_thong_tin_san_pham,
               san_pham_hasmany_thong_tin_san_pham: undefined,
               danh_gia_san_pham: product.san_pham_hasmany_danh_gia_san_pham,
               san_pham_hasmany_danh_gia_san_pham: undefined,
               thuong_hieu: product.san_pham_belongsto_thuong_hieu,
               san_pham_belongsto_thuong_hieu: undefined,
               thuoc_tinh_san_pham: product.san_pham_hasmany_thuoc_tinh_san_pham,
               san_pham_belongsto_loai_san_pham: undefined,
               san_pham_hasmany_thuoc_tinh_san_pham: undefined,
               gia_thap_nhat: giaThapNhat,
               nhom_loai: nhomLoai,
               allOutOfStock,
               loai_san_pham: {
                  ...loaiSanPham.toJSON(),
                  loai_san_pham_belongto_nhom_loai: undefined,
               },
            };
         });

         return {
            san_phams: result,
            total: result.length,
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

const sanPhamLienQuan = async (req, res) => {
   const idLoai = req.query.idLoai;
   if (!idLoai) {
      throw new __RESPONSE.BadRequestError({
         message: "Missing idLoai in request",
         suggestion: "Please check your request",
         request: req,
      });
   }
   return await db.san_pham
      .findAll({
         where: {
            hinh_thuc_ban: 1,
            ma_loai: idLoai,
         },
         include: [
            {
               model: db.loai_san_pham,
               as: "san_pham_belongsto_loai_san_pham",
               include: [
                  {
                     model: db.nhom_loai,
                     as: "loai_san_pham_belongto_nhom_loai",
                  },
               ],
            },
            {
               model: db.thuoc_tinh_san_pham,
               as: "san_pham_hasmany_thuoc_tinh_san_pham",
            },
            {
               model: db.danh_gia_san_pham,
               as: "san_pham_hasmany_danh_gia_san_pham",
            },
            {
               model: db.hinh_anh_san_pham,
               as: "san_pham_hasmany_hinh_anh_san_pham",
            },
            {
               model: db.thong_tin_san_pham,
               as: "san_pham_hasmany_thong_tin_san_pham",
            },
            {
               model: db.thuong_hieu,
               as: "san_pham_belongsto_thuong_hieu",
            },
         ],
      })
      .then((san_phams) => {
         if (!san_phams) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found san_phams",
               suggestion: "Please check your request",
               request: req,
            });
         }

         const result = san_phams.map((product) => {
            const loaiSanPham = product.san_pham_belongsto_loai_san_pham;
            const nhomLoai = loaiSanPham?.loai_san_pham_belongto_nhom_loai;

            const prices = product.san_pham_hasmany_thuoc_tinh_san_pham.map((tt) => tt.gia_ban);
            const giaCaoNhat = Math.max(...prices);
            const giaThapNhat = Math.min(...prices);
            const allOutOfStock = product.san_pham_hasmany_thuoc_tinh_san_pham.every((tt) => tt.inventory <= 0);
            return {
               ...product.toJSON(),
               gia_cao_nhat: giaCaoNhat,
               hinh_anh_san_pham: product.san_pham_hasmany_hinh_anh_san_pham,
               san_pham_hasmany_hinh_anh_san_pham: undefined,
               thong_tin_san_pham: product.san_pham_hasmany_thong_tin_san_pham,
               san_pham_hasmany_thong_tin_san_pham: undefined,
               danh_gia_san_pham: product.san_pham_hasmany_danh_gia_san_pham,
               san_pham_hasmany_danh_gia_san_pham: undefined,
               thuong_hieu: product.san_pham_belongsto_thuong_hieu,
               san_pham_belongsto_thuong_hieu: undefined,
               thuoc_tinh_san_pham: product.san_pham_hasmany_thuoc_tinh_san_pham,
               san_pham_belongsto_loai_san_pham: undefined,
               san_pham_hasmany_thuoc_tinh_san_pham: undefined,
               gia_thap_nhat: giaThapNhat,
               nhom_loai: nhomLoai,
               allOutOfStock,
               loai_san_pham: {
                  ...loaiSanPham.toJSON(),
                  loai_san_pham_belongto_nhom_loai: undefined,
               },
            };
         });
         return {
            san_phams: result,
            total: result.length,
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

module.exports = {
   getAllSanPham,
   getSanPhamById,
   searchSanPham,
   sanPhamTab,
   sanPhamLienQuan,
};
