"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class key_store extends Model {
      static associate(models) {
         key_store.belongsTo(models.tai_khoan, {
            foreignKey: "tai_khoan_id",
            as: "tai_khoan_id_belongto_tai_khoan",
         });
         key_store.hasMany(models.refresh_key_used, {
            foreignKey: "key_store_id",
            as: "key_store_hasMany_refresh_key_used",
         });
      }
   }
   key_store.init(
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         tai_khoan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
               model: "tai_khoan",
               key: "id",
            },
         },
         refresh_token: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
               notEmpty: true,
               len: [1],
            },
         },
         public_key: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
               notEmpty: true,
               len: [1],
            },
         },
         private_key: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
               notEmpty: true,
               len: [1],
            },
         },
      },
      {
         sequelize,
         modelName: "key_store",
         tableName: "key_store",
         underscored: true,
         timestamps: false,
         paranoid: false,
         freezeTableName: true,
      }
   );
   return key_store;
};
