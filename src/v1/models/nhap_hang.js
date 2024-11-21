"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class nhap_hang extends Model {
      static associate(models) {
         nhap_hang.belongsTo(models.nhan_vien, {
            foreignKey: "ma_nhan_vien",
            as: "ma_nhan_vien_belongto_nhan_vien",
         });
         nhap_hang.belongsTo(models.nha_cung_cap, {
            foreignKey: "ma_nha_cung_cap",
            as: "ma_nha_cung_cap_belongto_nha_cung_cap",
         });
         nhap_hang.hasMany(models.chi_tiet_nhap_hang, {
            foreignKey: "ma_nhap_hang",
            as: "nhap_hang_hasMany_chi_tiet",
         });
         nhap_hang.belongsToMany(models.san_pham, {
            through: models.chi_tiet_nhap_hang,
            foreignKey: "ma_nhap_hang",
            otherKey: "ma_san_pham",
            as: "nhap_hang_belongsToMany_san_pham",
         });
      }
   }
   nhap_hang.init(
      {
         ma_nhap_hang: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ma_nhan_vien: {
            type: DataTypes.INTEGER,
            references: {
               model: "nhan_vien",
               key: "ma_nhan_vien",
            },
         },
         ma_nha_cung_cap: {
            type: DataTypes.INTEGER,
            references: {
               model: "nha_cung_cap",
               key: "ma_nha_cung_cap",
            },
         },
         ngay_nhap: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
         },
         trang_thai: {
            type: DataTypes.STRING(50),
         },
         ghi_chu: {
            type: DataTypes.STRING(255),
         },
         tong_so_luong: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               min: 0,
            },
         },
         tong_gia_tien: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
               min: 0,
            },
         },
      },
      {
         sequelize,
         modelName: "nhap_hang",
         tableName: "nhap_hang",
         underscored: true,
         timestamps: true,
         paranoid: false,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return nhap_hang;
};
