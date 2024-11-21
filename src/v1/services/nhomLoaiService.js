"use strict";
const __RESPONSE = require("../core");
const db = require("../models");

const getAllNhomLoai = async (req, res) => {
   return await db.nhom_loai
      .findAll({
         attributes: ["ma_nhom_loai", "ten_nhom_loai", "thumbnail_image", "slug", "chi_tiet"],
         include: [
            {
               model: db.loai_san_pham,
               as: "nhom_loai_to_loai_san_pham",
               attributes: ["ma_loai", "ten_loai", "thumbnail_image", "slug", "chi_tiet"],
            },
         ],
      })
      .then((nhom_loais) => {
         if (!nhom_loais) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found nhom_loai",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {
            nhom_loais: nhom_loais,
            total: nhom_loais.length,
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
   getAllNhomLoai,
};
