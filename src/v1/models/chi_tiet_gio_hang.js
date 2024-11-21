"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class chi_tiet_gio_hang extends Model {
      static associate(models) {
         chi_tiet_gio_hang.belongsTo(models.gio_hang, {
            foreignKey: "ma_gio_hang",
            as: "ma_gio_hang_belongto_gio_hang",
         });
         chi_tiet_gio_hang.belongsTo(models.thuoc_tinh_san_pham, {
            foreignKey: "ma_thuoc_tinh",
            as: "ma_thuoc_tinh_belongto_thuoc_tinh",
         });
      }
   }
   chi_tiet_gio_hang.init(
      {
         ma_gio_hang: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "gio_hang",
               key: "ma_gio_hang",
            },
         },
         ma_thuoc_tinh: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "thuoc_tinh_san_pham",
               key: "ma_thuoc_tinh",
            },
         },
         so_luong: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
               min: 1,
            },
         },
      },
      {
         sequelize,
         modelName: "chi_tiet_gio_hang",
         tableName: "chi_tiet_gio_hang",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return chi_tiet_gio_hang;
};
