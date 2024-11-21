"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class chi_tiet_hoa_don extends Model {
      static associate(models) {
         chi_tiet_hoa_don.belongsTo(models.hoa_don, {
            foreignKey: "ma_hoa_don",
            as: "ma_hoa_don_belongto_hoa_don",
         });
         chi_tiet_hoa_don.belongsTo(models.thuoc_tinh_san_pham, {
            foreignKey: "ma_thuoc_tinh",
            as: "ma_thuoc_tinh_belongto_thuoc_tinh",
         });
      }
   }
   chi_tiet_hoa_don.init(
      {
         ma_hoa_don: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "hoa_don",
               key: "ma_hoa_don",
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
            validate: {
               min: 0,
            },
         },
         gia: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
               min: 0,
            },
         },
         giagiam: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
         },
         thanh_tien: {
            type: DataTypes.VIRTUAL,
            get() {
               return this.get("gia") * this.get("so_luong");
            },
         },
         trang_thai: {
            type: DataTypes.STRING(50),
         },
      },
      {
         sequelize,
         modelName: "chi_tiet_hoa_don",
         tableName: "chi_tiet_hoa_don",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return chi_tiet_hoa_don;
};
