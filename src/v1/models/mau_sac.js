"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class mau_sac extends Model {
        static associate(models) {
            mau_sac.hasMany(models.thuoc_tinh_san_pham, {foreignKey: "ma_mau_sac", as: "mau_sac_hasmany_thuoc_tinh_san_pham"});
        }
    }
    mau_sac.init(
        {
            ma_mau_sac: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
              },
              ten_mau_sac: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
              }
        },
        {
            sequelize,
            modelName: "mau_sac",
            tableName: "mau_sac",
            underscored: true,
            timestamps: true,
            paranoid: false,
            freezeTableName: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return mau_sac;
};
