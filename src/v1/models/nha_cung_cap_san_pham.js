"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class nha_cung_cap_san_pham extends Model {
      static associate(models) {
         nha_cung_cap_san_pham.belongsTo(models.nha_cung_cap, {
            foreignKey: "ma_nha_cung_cap",
            as: "nha_cung_cap_san_pham_belongsto_nha_cung_cap",
         });
         nha_cung_cap_san_pham.belongsTo(models.san_pham, {
            foreignKey: "ma_san_pham",
            as: "nha_cung_cap_san_pham_belongsto_ma_san_pham",
         });
      }
   }
   nha_cung_cap_san_pham.init(
      {
         ma_nha_cung_cap: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "nha_cung_cap",
               key: "ma_nha_cung_cap",
            },
         },
         ma_san_pham: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "san_pham",
               key: "ma_san_pham",
            },
         },
      },
      {
         sequelize,
         modelName: "nha_cung_cap_san_pham",
         tableName: "nha_cung_cap_san_pham",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return nha_cung_cap_san_pham;
};
