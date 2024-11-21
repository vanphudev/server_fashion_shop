"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class nhan_vien extends Model {
      static associate(models) {
         nhan_vien.hasOne(models.tai_khoan, {foreignKey: "tai_khoan_id", as: "nhan_vien_hasone_tai_khoan"});
         nhan_vien.hasMany(models.nhap_hang, {foreignKey: "ma_nhap_hang", as: "nhan_vien_hasmany_nhap_hang"});
         nhan_vien.hasMany(models.khuyen_mai, {foreignKey: "ma_khuyen_mai", as: "nhan_vien_hasmany_khuyen_mai"});
         nhan_vien.hasMany(models.hoa_don_doi_tra, {
            foreignKey: "ma_nhan_vien",
            as: "nhan_vien_hasmany_hoa_don_doi_tra",
         });
         nhan_vien.hasMany(models.hoa_don, {foreignKey: "ma_nhan_vien", as: "nhan_vien_hasmany_hoa_don"});
      }
   }
   nhan_vien.init(
      {
         ma_nhan_vien: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ten_nhan_vien: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         chuc_vu: {
            type: DataTypes.STRING,
            allowNull: true,
         },
         sdt: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         },
         dia_chi: {
            type: DataTypes.STRING,
            allowNull: true,
         },
         ngay_vao_lam: {
            type: DataTypes.DATEONLY,
            allowNull: true,
         },
         tai_khoan_id: {
            type: DataTypes.INTEGER,
            unique: true,
            references: {
               model: "tai_khoan",
               key: "id",
            },
         },
      },
      {
         sequelize,
         modelName: "nhan_vien",
         tableName: "nhan_vien",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return nhan_vien;
};
