"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class oauth_provider extends Model {
        static associate(models) {
            oauth_provider.hasOne(models.tai_khoan, {foreignKey: "tai_khoan_id", as:"oauth_provider_hasone_tai_khoan"});
        }
    }
    oauth_provider.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
              },
              tai_khoan_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'tai_khoan',
                  key: 'id',
                }
              },
              provider: {
                type: DataTypes.STRING,
                allowNull: false,
              },
              provider_id: {
                type: DataTypes.STRING,
                allowNull: false,
              }
        },
        {
            sequelize,
            modelName: "oauth_provider",
            tableName: "oauth_provider",
            underscored: true,
            timestamps: true,
            paranoid: false,
            freezeTableName: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return oauth_provider;
};
