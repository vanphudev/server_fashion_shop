"use strict";
const __RESPONSE = require("../core");
const {Op} = require("sequelize");
const db = require("../models");

const getAllPaments = async (req, res) => {
   return await db.phuong_thuc_thanh_toan
      .findAll({
         where: {
            trang_thai: {[Op.like]: "active"},
         },
      })
      .then((phuong_thuc_thanh_toans) => {
         if (!phuong_thuc_thanh_toans) {
            throw new __RESPONSE.NotFoundError({
               message: "Not found phuong_thuc_thanh_toans",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {
            phuong_thuc_thanh_toans: phuong_thuc_thanh_toans,
            total: phuong_thuc_thanh_toans.length,
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
   getAllPaments,
};
