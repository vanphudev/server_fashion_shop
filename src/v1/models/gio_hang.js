"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class gio_hang extends Model {
      static associate(models) {
         gio_hang.belongsTo(models.khach_hang, {
            foreignKey: "ma_khach_hang",
            as: "ma_khach_hang_belongto_khach_hang",
         });
         gio_hang.hasMany(models.chi_tiet_gio_hang, {
            foreignKey: "ma_gio_hang",
            as: "gio_hang_hasMany_chi_tiet",
         });
         gio_hang.belongsToMany(models.thuoc_tinh_san_pham, {
            through: models.chi_tiet_gio_hang,
            foreignKey: "ma_gio_hang",
            otherKey: "ma_thuoc_tinh",
            as: "gio_hang_belongsToMany_thuoc_tinh",
         });
      }
   }
   gio_hang.init(
      {
         ma_gio_hang: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ma_khach_hang: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
               model: "khach_hang",
               key: "ma_khach_hang",
            },
         },
      },
      {
         sequelize,
         modelName: "gio_hang",
         tableName: "gio_hang",
         underscored: true,
         timestamps: false,
         paranoid: false,
         freezeTableName: true,
      }
   );
   return gio_hang;
};
