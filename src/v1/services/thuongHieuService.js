"use strict";
const __RESPONSE = require("../core");
const db = require("../models");

const getAllThuongHieu = async (req, res) => {
   return await db.thuong_hieu
      .findAll({})
      .then((thuong_hieus) => {
         if (!thuong_hieus) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found thuong_hieus",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {
            thuong_hieus: thuong_hieus,
            total: thuong_hieus.length,
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
   getAllThuongHieu,
};
