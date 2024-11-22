"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class thong_tin_san_pham extends Model {
      static associate(models) {
         thong_tin_san_pham.belongsTo(models.san_pham, {
            foreignKey: "ma_san_pham",
            as: "thong_tin_san_pham_belongto_san_pham",
         });
      }
   }
   thong_tin_san_pham.init(
      {
         ma_thong_tin_san_pham: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         ma_san_pham: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "san_pham",
               key: "ma_san_pham",
            },
         },
         key_attribute: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         value_attribute: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: "thong_tin_san_pham",
         tableName: "thong_tin_san_pham",
         underscored: true,
         timestamps: false,
         paranoid: false,
         freezeTableName: true,
      }
   );
   return thong_tin_san_pham;
};
