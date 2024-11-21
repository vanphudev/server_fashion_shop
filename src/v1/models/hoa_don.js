"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class hoa_don extends Model {
      static associate(models) {
         hoa_don.belongsTo(models.khach_hang, {
            foreignKey: "ma_khach_hang",
            as: "ma_khach_hang_belongto_khach_hang",
         });
         hoa_don.belongsTo(models.nhan_vien, {
            foreignKey: "ma_nhan_vien",
            as: "ma_nhan_vien_belongto_nhan_vien",
         });
         hoa_don.belongsTo(models.khuyen_mai, {
            foreignKey: "ma_khuyen_mai",
            as: "ma_khuyen_mai_belongto_khuyen_mai",
         });
         hoa_don.belongsTo(models.phuong_thuc_thanh_toan, {
            foreignKey: "ma_phuong_thuc",
            as: "ma_phuong_thuc_belongto_phuong_thuc",
         });
         hoa_don.hasMany(models.chi_tiet_hoa_don, {
            foreignKey: "ma_hoa_don",
            as: "hoa_don_hasMany_chi_tiet",
         });
         hoa_don.hasOne(models.hoa_don_doi_tra, {
            foreignKey: "ma_hoa_don",
            as: "hoa_don_hasOne_doi_tra",
         });
         hoa_don.belongsToMany(models.thuoc_tinh_san_pham, {
            through: models.chi_tiet_hoa_don,
            foreignKey: "ma_hoa_don",
            otherKey: "ma_thuoc_tinh",
            as: "hoa_don_belongsToMany_thuoc_tinh",
         });
      }
   }
   hoa_don.init(
      {
         ma_hoa_don: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ma_khach_hang: {
            type: DataTypes.INTEGER,
            references: {
               model: "khach_hang",
               key: "ma_khach_hang",
            },
         },
         ma_nhan_vien: {
            type: DataTypes.INTEGER,
            references: {
               model: "nhan_vien",
               key: "ma_nhan_vien",
            },
         },
         ngay_lap: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
         },
         ma_khuyen_mai: {
            type: DataTypes.INTEGER,
            references: {
               model: "khuyen_mai",
               key: "ma_khuyen_mai",
            },
         },
         trang_thai_giao_hang: {
            type: DataTypes.STRING(50),
         },
         ma_phuong_thuc: {
            type: DataTypes.INTEGER,
            references: {
               model: "phuong_thuc_thanh_toan",
               key: "ma_phuong_thuc",
            },
         },
         tong_so_luong_mua: {
            type: DataTypes.INTEGER,
         },
         tien_giam: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
            validate: {
               min: 0,
            },
         },
         tong_gia_tri: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
               min: 0,
            },
         },
         tong_don_hang: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
               min: 0,
            },
         },
         hinh_thuc_ban: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
            validate: {
               isIn: [[0, 1]],
            },
         },
         trang_thai_doi_tra: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
               isIn: [[0, 1, 2]],
            },
         },
      },
      {
         sequelize,
         modelName: "hoa_don",
         tableName: "hoa_don",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return hoa_don;
};
