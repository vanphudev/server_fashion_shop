"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class nhom_loai extends Model {
      static associate(models) {
         nhom_loai.hasMany(models.loai_san_pham, {
            foreignKey: "ma_nhom_loai",
            as: "nhom_loai_to_loai_san_pham",
         });
      }
   }
   nhom_loai.init(
      {
         ma_nhom_loai: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ten_nhom_loai: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
               len: [1],
            },
         },
         thumbnail_image: {
            type: DataTypes.TEXT,
            validate: {
               len: [1],
            },
         },
         chi_tiet: {
            type: DataTypes.TEXT,
         },
         slug: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: "nhom_loai",
         tableName: "nhom_loai",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return nhom_loai;
};
