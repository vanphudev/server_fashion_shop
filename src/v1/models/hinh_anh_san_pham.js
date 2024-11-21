"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class hinh_anh_san_pham extends Model {
        static associate(models) {
            hinh_anh_san_pham.belongsTo(models.san_pham, { foreignKey: "ma_san_pham", as: "hinh_anh_san_pham_belongsto_san_pham" });
        }
    }
    hinh_anh_san_pham.init(
        {
            ma_hinh_anh: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            ma_san_pham: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'san_pham', // Reference the table 'san_pham'
                    key: 'ma_san_pham',
                }
            },
            hinh_anh: {
                type: DataTypes.STRING, // Use STRING since NVARCHAR(MAX) does not exist in Sequelize
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "hinh_anh_san_pham",
            tableName: "hinh_anh_san_pham",
            underscored: true,
            timestamps: true,
            paranoid: false,
            freezeTableName: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return hinh_anh_san_pham;
};
