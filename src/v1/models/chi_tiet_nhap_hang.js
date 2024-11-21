"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class chi_tiet_nhap_hang extends Model {
      static associate(models) {
         chi_tiet_nhap_hang.belongsTo(models.nhap_hang, {
            foreignKey: "ma_nhap_hang",
            as: "ma_nhap_hang_belongto_nhap_hang",
         });
         chi_tiet_nhap_hang.belongsTo(models.san_pham, {
            foreignKey: "ma_san_pham",
            as: "ma_san_pham_belongto_san_pham",
         });
      }
   }
   chi_tiet_nhap_hang.init(
      {
         ma_nhap_hang: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "nhap_hang",
               key: "ma_nhap_hang",
            },
         },
         ma_san_pham: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "san_pham",
               key: "ma_san_pham",
            },
         },
         so_luong: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               min: 0,
            },
         },
         gia_nhap: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
               min: 0,
            },
         },
      },
      {
         sequelize,
         modelName: "chi_tiet_nhap_hang",
         tableName: "chi_tiet_nhap_hang",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return chi_tiet_nhap_hang;
};
