"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class man_hinh extends Model {
      static associate(models) {
         man_hinh.belongsToMany(models.nhom_quyen, {
            through: models.phan_quyen,
            foreignKey: "id_man_hinh",
            otherKey: "id_nhom_quyen",
            as: "man_hinh_belongsToMany_nhom_quyen",
         });
         man_hinh.hasMany(models.phan_quyen, {
            foreignKey: "id_man_hinh",
            as: "man_hinh_hasMany_phan_quyen",
         });
      }
   }
   man_hinh.init(
      {
         id_man_hinh: {
            type: DataTypes.INTEGER,
            primaryKey: true,
         },
         ten_man_hinh: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
               notEmpty: true,
               len: [1, 255],
            },
         },
      },
      {
         sequelize,
         modelName: "man_hinh",
         tableName: "man_hinh",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "create_at",
         updatedAt: "update_at",
      }
   );
   return man_hinh;
};
