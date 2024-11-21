"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class tai_khoan extends Model {
      static associate(models) {
         tai_khoan.hasOne(models.oauth_provider, {foreignKey: "oauth_provider", as: "tai_khoan_hasone_oauth_provider"});
         tai_khoan.hasMany(models.danh_gia_san_pham, {
            foreignKey: "tai_khoan_id",
            as: "tai_khoan_hasmany_danh_gia_san_pham",
         });
         tai_khoan.hasMany(models.tai_khoan_nhom_quyen, {
            foreignKey: "id_tai_khoan",
            as: "tai_khoan_hasmany_tai_khoan_nhom_quyen",
         });
         tai_khoan.belongsToMany(models.nhom_quyen, {
            through: models.tai_khoan_nhom_quyen,
            foreignKey: "id_tai_khoan",
            otherKey: "id_nhom_quyen",
            as: "tai_khoan_belongstomany_nhom_quyen",
         });
         tai_khoan.hasOne(models.key_store, {foreignKey: "tai_khoan_id", as: "tai_khoan_hasone_key_store"});
         tai_khoan.hasOne(models.khach_hang, {foreignKey: "tai_khoan_id", as: "tai_khoan_hasone_khach_hang"});
         tai_khoan.hasOne(models.nhan_vien, {foreignKey: "tai_khoan_id", as: "tai_khoan_hasone_nhan_vien"});
      }
   }
   tai_khoan.init(
      {
         tai_khoan_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ten_dang_nhap: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
               notEmpty: true,
            },
         },
         mat_khau_hash: {
            type: DataTypes.TEXT,
         },
         hoat_dong: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
         },
         is_oauth: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
         },
      },
      {
         sequelize,
         modelName: "tai_khoan",
         tableName: "tai_khoan",
         underscored: true,
         timestamps: false,
         paranoid: false,
         freezeTableName: true,
      }
   );
   return tai_khoan;
};
