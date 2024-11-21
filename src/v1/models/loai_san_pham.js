"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class loai_san_pham extends Model {
      static associate(models) {
         loai_san_pham.belongsTo(models.nhom_loai, {foreignKey: "ma_nhom_loai", as: "loai_san_pham_belongto_nhom_loai"});
      }
   }
   loai_san_pham.init(
      {
         ma_loai: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ten_loai: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
               len: [1],
            },
         },
         ma_nhom_loai: {
            type: DataTypes.INTEGER,
            references: {
               model: "nhom_loai",
               key: "ma_nhom_loai",
            },
         },
         thumbnail_image: {
            type: DataTypes.TEXT,
         },
         slug: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               len: [1],
            },
         },
         chi_tiet: {
            type: DataTypes.TEXT,
         },
      },
      {
         sequelize,
         modelName: "loai_san_pham",
         tableName: "loai_san_pham",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return loai_san_pham;
};
