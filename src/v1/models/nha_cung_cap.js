"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class nha_cung_cap extends Model {
      static associate(models) {
         nha_cung_cap.hasMany(models.nha_cung_cap_san_pham, {
            foreignKey: "ma_nha_cung_cap",
            as: "nha_cung_cap_hasmany_nha_cung_cap_san_pham",
         });
         nha_cung_cap.hasMany(models.nhap_hang, {foreignKey: "ma_nha_cung_cap", as: "nha_cung_cap_hasmany_nhap_hang"});
         nha_cung_cap.belongsToMany(models.san_pham, {
            through: models.nha_cung_cap_san_pham,
            foreignKey: "ma_nha_cung_cap",
            otherKey: "ma_san_pham",
            as: "nha_cung_cap_belongstomany_san_pham",
         });
      }
   }
   nha_cung_cap.init(
      {
         ma_nha_cung_cap: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         ten_nha_cung_cap: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         },
         dia_chi: {
            type: DataTypes.STRING,
            allowNull: true,
         },
         dien_thoai: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
               is: /^[0-9]+$/, // Ensures only digits are allowed
            },
         },
      },
      {
         sequelize,
         modelName: "nha_cung_cap",
         tableName: "nha_cung_cap",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return nha_cung_cap;
};
