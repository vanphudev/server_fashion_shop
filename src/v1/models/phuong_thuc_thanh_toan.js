"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class phuong_thuc_thanh_toan extends Model {
      static associate(models) {
         phuong_thuc_thanh_toan.hasMany(models.hoa_don, {
            foreignKey: "ma_phuong_thuc",
            as: "phuong_thuc_hasMany_hoa_don",
         });
         phuong_thuc_thanh_toan.hasMany(models.hoa_don_doi_tra, {
            foreignKey: "ma_phuong_thuc",
            as: "phuong_thuc_hasMany_hoa_don_doi_tra",
         });
      }
   }
   phuong_thuc_thanh_toan.init(
      {
         ma_phuong_thuc: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ten_phuong_thuc: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
               notEmpty: true,
               len: [1, 255],
            },
         },
         mo_ta: {
            type: DataTypes.STRING(255),
         },
         trang_thai: {
            type: DataTypes.STRING(50),
         },
      },
      {
         sequelize,
         modelName: "phuong_thuc_thanh_toan",
         tableName: "phuong_thuc_thanh_toan",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return phuong_thuc_thanh_toan;
};
