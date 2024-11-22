"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class thuoc_tinh_san_pham extends Model {
      static associate(models) {
         thuoc_tinh_san_pham.belongsTo(models.kich_thuoc, {
            foreignKey: "ma_kich_thuoc",
            as: "thuoc_tinh_san_pham_belongsto_kich_thuoc",
         });
         thuoc_tinh_san_pham.belongsTo(models.mau_sac, {
            foreignKey: "ma_mau_sac",
            as: "thuoc_tinh_san_pham_belongsto_mau_sac",
         });
         thuoc_tinh_san_pham.belongsTo(models.san_pham, {
            foreignKey: "ma_san_pham",
            as: "thuoc_tinh_san_pham_belongsto_san_pham",
         });
         thuoc_tinh_san_pham.hasMany(models.chi_tiet_hoa_don, {
            foreignKey: "ma_thuoc_tinh",
            as: "thuoc_tinh_san_pham_hasmany_chi_tiet_hoa_don",
         });
         thuoc_tinh_san_pham.belongsToMany(models.hoa_don, {
            through: models.chi_tiet_hoa_don,
            foreignKey: "ma_thuoc_tinh",
            otherKey: "ma_hoa_don",
            as: "thuoc_tinh_san_pham_belongstomany_hoa_don",
         });
         thuoc_tinh_san_pham.hasMany(models.chi_tiet_hoa_don_doi_tra, {
            foreignKey: "ma_thuoc_tinh",
            as: "thuoc_tinh_san_pham_hasmany_chi_tiet_hoa_donchi_tiet_hoa_don_doi_tra",
         });
         thuoc_tinh_san_pham.belongsToMany(models.hoa_don_doi_tra, {
            through: models.chi_tiet_hoa_don_doi_tra,
            foreignKey: "ma_thuoc_tinh",
            otherKey: "ma_hoa_don_doi_tra",
            as: "thuoc_tinh_san_pham_belongstomany_hoa_don_doi_tra",
         });
      }
   }
   thuoc_tinh_san_pham.init(
      {
         ma_thuoc_tinh: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ma_san_pham: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "san_pham", // Name of the referenced table
               key: "ma_san_pham",
            },
         },
         ma_kich_thuoc: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "kich_thuoc",
               key: "ma_kich_thuoc",
            },
         },
         ma_mau_sac: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "mau_sac",
               key: "ma_mau_sac",
            },
         },
         so_luong_ton: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
               min: 0, // Ensure quantity is non-negative
            },
         },
         gia_ban: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
               min: 0, // Ensure price is non-negative
            },
         },
      },
      {
         sequelize,
         modelName: "thuoc_tinh_san_pham",
         tableName: "thuoc_tinh_san_pham",
         underscored: true,
         timestamps: false,
         paranoid: false,
         freezeTableName: true,
      }
   );
   return thuoc_tinh_san_pham;
};
