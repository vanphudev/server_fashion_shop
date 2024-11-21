"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class san_pham extends Model {
      static associate(models) {
         san_pham.belongsToMany(models.nha_cung_cap, {
            through: models.nha_cung_cap_san_pham,
            foreignKey: "ma_san_pham",
            otherKey: "ma_nha_cung_cap",
            as: "san_pham_belongstomany_nha_cung_cap",
         });
         san_pham.hasMany(models.nha_cung_cap_san_pham, {
            foreignKey: "ma_san_pham",
            as: "san_pham_hasmany_nha_cung_cap_san_pham",
         });
         san_pham.belongsTo(models.loai_san_pham, {foreignKey: "ma_loai", as: "san_pham_belongsto_loai_san_pham"});
         san_pham.hasMany(models.hinh_anh_san_pham, {
            foreignKey: "ma_san_pham",
            as: "san_pham_hasmany_hinh_anh_san_pham",
         });
         san_pham.hasMany(models.thong_tin_san_pham, {
            foreignKey: "ma_san_pham",
            as: "san_pham_hasmany_thong_tin_san_pham",
         });
         san_pham.belongsToMany(models.nhap_hang, {
            through: models.chi_tiet_nhap_hang,
            foreignKey: "ma_san_pham",
            otherKey: "ma_nhap_hang",
            as: "san_pham_belongstomany_nhap_hang",
         });
         san_pham.hasMany(models.chi_tiet_nhap_hang, {
            foreignKey: "ma_san_pham",
            as: "san_pham_hasmany_chi_tiet_nhap_hang",
         });
         san_pham.hasMany(models.thuoc_tinh_san_pham, {
            foreignKey: "ma_san_pham",
            as: "san_pham_hasmany_thuoc_tinh_san_pham",
         });
         san_pham.hasMany(models.danh_gia_san_pham, {
            foreignKey: "ma_san_pham",
            as: "san_pham_hasmany_danh_gia_san_pham",
         });
         san_pham.belongsTo(models.thuong_hieu, {foreignKey: "ma_thuong_hieu", as: "san_pham_belongsto_thuong_hieu"});
      }
   }
   san_pham.init(
      {
         ma_san_pham: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         ten_san_pham: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         },
         ma_loai: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
               model: "loai_san_pham",
               key: "ma_loai",
            },
         },
         ma_thuong_hieu: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
               model: "thuong_hieu",
               key: "ma_thuong_hieu",
            },
         },
         thumbnail_image: {
            type: DataTypes.TEXT,
            allowNull: true,
         },
         giam_gia: {
            type: DataTypes.DECIMAL(5, 2),
            defaultValue: 0,
            allowNull: false,
         },
         so_luong_kich_thuoc: {
            type: DataTypes.INTEGER,
            allowNull: true,
         },
         so_luong_mau_sac: {
            type: DataTypes.INTEGER,
            allowNull: true,
         },
         so_luong: {
            type: DataTypes.INTEGER,
            allowNull: true,
         },
         slug: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         mo_ta: {
            type: DataTypes.TEXT,
            allowNull: true,
         },
         hinh_thuc_ban: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
               isIn: [[0, 1, 2]], // Only allows values 0, 1, or 2
            },
         },
      },
      {
         sequelize,
         modelName: "san_pham",
         tableName: "san_pham",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return san_pham;
};
