"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class khach_hang extends Model {
      static associate(models) {
         khach_hang.hasOne(models.tai_khoan, {foreignKey: "tai_khoan_id", as: "khach_hang_hasone_tai_khoan"});
         khach_hang.hasOne(models.gio_hang, {foreignKey: "ma_khach_hang", as: "khach_hang_hasone_gio_hang"});
         khach_hang.hasMany(models.hoa_don, {foreignKey: "ma_hoa_don", as: "khach_hang_hasone_hoa_don"});
      }
   }
   khach_hang.init(
      {
         ma_khach_hang: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ten_khach_hang: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         dien_thoai: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         },
         dia_chi: {
            type: DataTypes.STRING,
            allowNull: true,
         },
         diem_thuong: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
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
         modelName: "khach_hang",
         tableName: "khach_hang",
         underscored: true,
         timestamps: false,
         paranoid: false,
         freezeTableName: true,
      }
   );
   return khach_hang;
};
