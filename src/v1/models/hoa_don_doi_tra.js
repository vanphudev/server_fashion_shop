"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class hoa_don_doi_tra extends Model {
      static associate(models) {
         hoa_don_doi_tra.belongsTo(models.hoa_don, {
            foreignKey: "ma_hoa_don",
            as: "ma_hoa_don_belongto_hoa_don",
         });
         hoa_don_doi_tra.belongsTo(models.nhan_vien, {
            foreignKey: "ma_nhan_vien",
            as: "ma_nhan_vien_belongto_nhan_vien",
         });
         hoa_don_doi_tra.belongsTo(models.phuong_thuc_thanh_toan, {
            foreignKey: "ma_phuong_thuc",
            as: "ma_phuong_thuc_belongto_phuong_thuc",
         });
         hoa_don_doi_tra.hasMany(models.chi_tiet_hoa_don_doi_tra, {
            foreignKey: "ma_hoa_don",
            as: "hoa_don_doi_tra_hasMany_chi_tiet",
         });
         hoa_don_doi_tra.belongsToMany(models.thuoc_tinh_san_pham, {
            through: models.chi_tiet_hoa_don_doi_tra,
            foreignKey: "ma_hoa_don",
            otherKey: "ma_thuoc_tinh",
            as: "hoa_don_doi_tra_belongsToMany_thuoc_tinh",
         });
      }
   }
   hoa_don_doi_tra.init(
      {
         ma_hoa_don: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "hoa_don",
               key: "ma_hoa_don",
            },
         },
         ma_nhan_vien: {
            type: DataTypes.INTEGER,
            references: {
               model: "nhan_vien",
               key: "ma_nhan_vien",
            },
         },
         ma_phuong_thuc: {
            type: DataTypes.INTEGER,
            references: {
               model: "phuong_thuc_thanh_toan",
               key: "ma_phuong_thuc",
            },
         },
         tong_so_luong: {
            type: DataTypes.INTEGER,
         },
         ngay_doi_tra: {
            type: DataTypes.DATE,
         },
         tien_giam: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
            validate: {
               min: 0,
            },
         },
         tong_tien_sau_khi_doi: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
         },
      },
      {
         sequelize,
         modelName: "hoa_don_doi_tra",
         tableName: "hoa_don_doi_tra",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return hoa_don_doi_tra;
};
