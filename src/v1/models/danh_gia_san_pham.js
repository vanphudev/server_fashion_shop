"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class danh_gia_san_pham extends Model {
      static associate(models) {
         danh_gia_san_pham.belongsTo(models.san_pham, {
            foreignKey: "ma_san_pham",
            as: "ma_san_pham_belongto_san_pham",
         });
         danh_gia_san_pham.belongsTo(models.tai_khoan, {
            foreignKey: "tai_khoan_id",
            as: "tai_khoan_id_belongto_tai_khoan",
         });
      }
   }
   danh_gia_san_pham.init(
      {
         ma_danh_gia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ma_san_pham: {
            type: DataTypes.INTEGER,
            references: {
               model: "san_pham",
               key: "ma_san_pham",
            },
         },
         tai_khoan_id: {
            type: DataTypes.INTEGER,
            references: {
               model: "tai_khoan",
               key: "id",
            },
         },
         diem_danh_gia: {
            type: DataTypes.INTEGER,
            validate: {
               min: 1,
               max: 5,
            },
         },
         noi_dung: {
            type: DataTypes.TEXT,
         },
      },
      {
         sequelize,
         modelName: "danh_gia_san_pham",
         tableName: "danh_gia_san_pham",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return danh_gia_san_pham;
};
