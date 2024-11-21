"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class thuong_hieu extends Model {
      static associate(models) {
         thuong_hieu.hasMany(models.san_pham, {foreignKey: "ma_thuong_hieu", as: "thuong_hieu_hasmany_san_pham"});
      }
   }
   thuong_hieu.init(
      {
         ma_thuong_hieu: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ten_thuong_hieu: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
               len: [1, 255], // Ensures non-empty and within max length
            },
         },
         mo_ta: {
            type: DataTypes.TEXT,
            allowNull: true,
         },
         thumbnail_image: {
            type: DataTypes.TEXT,
            allowNull: true,
         },
      },
      {
         sequelize,
         modelName: "thuong_hieu",
         tableName: "thuong_hieu",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return thuong_hieu;
};
