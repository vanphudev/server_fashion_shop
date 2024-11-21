"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class phan_quyen extends Model {
      static associate(models) {
         phan_quyen.belongsTo(models.man_hinh, {
            foreignKey: "id_man_hinh",
            as: "id_man_hinh_belongto_man_hinh"
         });
         phan_quyen.belongsTo(models.nhom_quyen, {
            foreignKey: "id_nhom_quyen",
            as: "id_nhom_quyen_belongto_nhom_quyen"
         });
      }
   }
   phan_quyen.init(
      {
         id_man_hinh: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "man_hinh",
               key: "id_man_hinh",
            },
         },
         id_nhom_quyen: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "nhom_quyen",
               key: "id_nhom_quyen",
            },
         },
         co_quyen: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            comment: "nhóm quyền đó có thể vào màn hình đó không",
         }
      },
      {
         sequelize,
         modelName: "phan_quyen",
         tableName: "phan_quyen",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "create_at",
         updatedAt: "update_at",
      }
   );
   return phan_quyen;
};