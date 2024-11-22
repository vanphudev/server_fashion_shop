"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class khuyen_mai extends Model {
      static associate(models) {
         khuyen_mai.belongsTo(models.nhan_vien, {
            foreignKey: "ma_nhan_vien",
            as: "ma_nhan_vien_belongto_nhan_vien",
         });
         khuyen_mai.hasMany(models.hoa_don, {
            foreignKey: "ma_khuyen_mai",
            as: "khuyen_mai_hasMany_hoa_don",
         });
      }
   }
   khuyen_mai.init(
      {
         ma_khuyen_mai: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         code: {
            type: DataTypes.STRING,
            unique: true,
         },
         gia_tri: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
               min: 0,
               max: 100,
            },
         },
         thoi_gian_bat_dau: {
            type: DataTypes.DATE,
         },
         thoi_gian_ket_thuc: {
            type: DataTypes.DATE,
         },
         so_luong_toi_da: {
            type: DataTypes.INTEGER,
         },
         so_luong_da_dung: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
               max(value) {
                  if (value > this.so_luong_toi_da) {
                     throw new Error("Số lượng đã dùng không được vượt quá số lượng tối đa");
                  }
               },
            },
         },
         tinh_trang: {
            type: DataTypes.STRING(50),
         },
         ghi_chu: {
            type: DataTypes.STRING(255),
         },
         gia_tri_hoa_don_toi_thieu: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
               min: 0,
            },
         },
         ma_nhan_vien: {
            type: DataTypes.INTEGER,
            references: {
               model: "nhan_vien",
               key: "ma_nhan_vien",
            },
         },
      },
      {
         sequelize,
         modelName: "khuyen_mai",
         tableName: "khuyen_mai",
         underscored: true,
         timestamps: false,
         paranoid: false,
         freezeTableName: true,
      }
   );
   return khuyen_mai;
};
