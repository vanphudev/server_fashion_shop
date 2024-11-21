"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class refresh_key_used extends Model {
      static associate(models) {
         refresh_key_used.belongsTo(models.key_store, {
            foreignKey: "key_store_id",
            as: "key_store_id_belongto_key_store",
         });
      }
   }
   refresh_key_used.init(
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         key_store_id: {
            type: DataTypes.INTEGER,
            references: {
               model: "key_store",
               key: "id",
            },
            onDelete: "CASCADE",
         },
         refresh_token: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
               notEmpty: true,
               len: [1],
            },
         },
         used_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
         },
      },
      {
         sequelize,
         modelName: "refresh_key_used",
         tableName: "refresh_key_used",
         underscored: true,
         timestamps: false,
         paranoid: false,
         freezeTableName: true,
      }
   );
   return refresh_key_used;
};
