"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class kich_thuoc extends Model {
      static associate(models) {
         kich_thuoc.hasMany(models.thuoc_tinh_san_pham, {
            foreignKey: "ma_kich_thuoc",
            as: "kich_thuoc_hasmany_thuoc_tinh_san_pham",
         });
      }
   }
   kich_thuoc.init(
      {
         ma_kich_thuoc: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         ten_kich_thuoc: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         },
      },
      {
         sequelize,
         modelName: "kich_thuoc",
         tableName: "kich_thuoc",
         underscored: true,
         timestamps: false,
         paranoid: false,
         freezeTableName: true,
      }
   );
   return kich_thuoc;
};
