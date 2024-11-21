"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class nhom_quyen extends Model {
      static associate(models) {
         nhom_quyen.belongsToMany(models.tai_khoan, {
            through: models.tai_khoan_nhom_quyen,
            foreignKey: "id_nhom_quyen",
            otherKey: "id_tai_khoan",
            as: "nhom_quyen_belongsToMany_tai_khoan",
         });
         nhom_quyen.belongsToMany(models.man_hinh, {
            through: models.phan_quyen,
            foreignKey: "id_nhom_quyen",
            otherKey: "id_man_hinh",
            as: "nhom_quyen_belongsToMany_man_hinh",
         });
         nhom_quyen.hasMany(models.tai_khoan_nhom_quyen, {
            foreignKey: "id_nhom_quyen",
            as: "nhom_quyen_hasMany_tai_khoan_nhom_quyen",
         });
         nhom_quyen.hasMany(models.phan_quyen, {
            foreignKey: "id_nhom_quyen",
            as: "nhom_quyen_hasMany_phan_quyen",
         });
      }
   }
   nhom_quyen.init(
      {
         id_nhom_quyen: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ten_nhom: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
               notEmpty: true,
               len: [1, 255],
            },
         },
         mo_ta: {
            type: DataTypes.STRING(255),
            allowNull: true,
         },
      },
      {
         sequelize,
         modelName: "nhom_quyen",
         tableName: "nhom_quyen",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "create_at",
         updatedAt: "update_at",
      }
   );
   return nhom_quyen;
};
