"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class tai_khoan_nhom_quyen extends Model {
      static associate(models) {
         tai_khoan_nhom_quyen.belongsTo(models.tai_khoan, {
            foreignKey: "id_tai_khoan",
            as: "id_tai_khoan_belongto_tai_khoan",
         });
         tai_khoan_nhom_quyen.belongsTo(models.nhom_quyen, {
            foreignKey: "id_nhom_quyen",
            as: "id_nhom_quyen_belongto_nhom_quyen",
         });
      }
   }
   tai_khoan_nhom_quyen.init(
      {
         id_tai_khoan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "tai_khoan",
               key: "id",
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
      },
      {
         sequelize,
         modelName: "tai_khoan_nhom_quyen",
         tableName: "tai_khoan_nhom_quyen",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "create_at",
         updatedAt: "update_at",
      }
   );
   return tai_khoan_nhom_quyen;
};
