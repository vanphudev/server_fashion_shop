"use strict";
const moment = require("moment");
const __RESPONSE = require("../../core");
const db = require("../../models");
const bycrypt = require("bcrypt");
const {validationResult} = require("express-validator");
const crypto = require("crypto");
const {createTokenPair, verifyToken} = require("../../middlewares/Auth/authUtils");

const {
   createKeyToken,
   findTokenByCustomerId,
   removeKeyByCustomerId,
   findRefreshTokenUsed,
} = require("../keyTokenService/keyTokenService");
const getInfoCustomer = require("../../utils/getInforCustomer");
const khach_hang = require("../../models/khach_hang");
const gio_hang = require("../../models/gio_hang");

const handlerRefreshToken = async (req, res) => {
   const {refreshToken, tai_khoan_id} = req.body;
   if (!refreshToken) {
      throw new __RESPONSE.BadRequestError({
         message: "Thiếu thông tin - Missing information - refreshToken",
         suggestion: "Please check again your request",
      });
   }
   if (!tai_khoan_id) {
      throw new __RESPONSE.BadRequestError({
         message: "Thiếu thông tin - Missing information - tai_khoan_id",
         suggestion: "Please check again your request",
      });
   }

   const key_store = await findTokenByCustomerId(tai_khoan_id);

   const foundKeyTokenUsed = await findRefreshTokenUsed(refreshToken, key_store.id);
   if (foundKeyTokenUsed) {
      const {tai_khoan_id} = verifyToken(refreshToken, key_store.private_key);
      await removeKeyByCustomerId(tai_khoan_id);
      throw new __RESPONSE.UnauthorizedError({
         message: "Token đã được sử dụng! Vui lòng đăng nhập lại!",
         suggestion: "Please check again your request",
         request: req,
      });
   }

   const foundKeyToken = await findTokenByCustomerId(tai_khoan_id);
   if (foundKeyToken) {
      const {tai_khoan_id} = verifyToken(refreshToken, foundKeyToken.private_key);
      if (!tai_khoan_id) {
         throw new __RESPONSE.UnauthorizedError({
            message: "Token không tồn tại! - Đăng nhập lại!",
            suggestion: "Please check again your request",
            request: req,
         });
      }
      const tai_khoan = await db.tai_khoan.findOne({where: {tai_khoan_id}});
      if (!tai_khoan) {
         throw new __RESPONSE.UnauthorizedError({
            message: "Token không tồn tại! - Đăng nhập lại!",
            suggestion: "Please check again your request",
            request: req,
         });
      }

      const tokens = await createTokenPair(
         {
            tai_khoan_id: tai_khoan.tai_khoan_id,
            ma_khach_hang: khach_hang.ma_khach_hang,
            ten_khach_hang: khach_hang.ten_khach_hang,
            dien_thoai: khach_hang.dien_thoai,
            dia_chi: khach_hang.dia_chi,
         },
         foundKeyToken.public_key,
         foundKeyToken.private_key
      );

      await foundKeyToken
         .update(
            {
               refresh_token: tokens.refreshToken,
            },
            {where: {tai_khoan_id: tai_khoan.tai_khoan_id}}
         )
         .then((keyToken) => {
            if (!keyToken) {
               throw new __RESPONSE.UnauthorizedError({
                  message: "Lỗi cập nhật token - Error updating token",
                  suggestion: "Please check again your request",
               });
            }
         });

      await db.refresh_key_used
         .create({
            key_store_id: foundKeyToken.id,
            refresh_token: refreshToken,
         })
         .then((refreshKeyUsed) => {
            if (!refreshKeyUsed) {
               throw new __RESPONSE.UnauthorizedError({
                  message: "Lỗi thêm token vào danh sách đã sử dụng - Error adding token to used list",
                  suggestion: "Please check again your request",
               });
            }
         });

      return {
         khach_hang: getInfoCustomer({
            fileds: ["tai_khoan_id", "ma_khach_hang", "ten_khach_hang", "dien_thoai", "dia_chi"],
            object: khach_hang,
         }),
         tokens,
      };
   } else {
      throw new __RESPONSE.UnauthorizedError({
         message: "Token không tồn tại! - Đăng nhập lại!",
         suggestion: "Please check again your request",
         request: req,
      });
   }
};

const logOut = async ({keyStore}) => {
   if (!keyStore) {
      throw new __RESPONSE.NotFoundError({
         message: "Không tìm thấy token - Token not found",
         suggestion: "Please check again your request",
      });
   }
   const {tai_khoan_id} = keyStore;
   if (!tai_khoan_id) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi tìm giỏ hàng - Error finding cart",
         suggestion: "Please check again your request",
      });
   }
   const keyToken = await removeKeyByCustomerId(tai_khoan_id);
   if (!keyToken) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi xóa token - Error deleting token",
         suggestion: "Please check again your request",
      });
   }
   return {keyToken};
};

const signIn = async (req, res) => {
   const {username, password} = req.body;
   if (!username) {
      throw new __RESPONSE.BadRequestError({
         message: "Thiếu thông tin - Missing information - username",
         suggestion: "Please check again your request",
      });
   }

   if (!password) {
      throw new __RESPONSE.BadRequestError({
         message: "Thiếu thông tin - Missing information - password",
         suggestion: "Please check again your request",
      });
   }

   const tai_khoan = await db.tai_khoan.findOne({where: {ten_dang_nhap: username}});
   if (!tai_khoan) {
      throw new __RESPONSE.NotFoundError({
         message: "Không tìm thấy tài khoản - tai_khoan not found",
         suggestion: "Please check again your request",
      });
   }

   const isPasswordValid = await bycrypt.compare(password, tai_khoan.mat_khau_hash);
   if (!isPasswordValid) {
      throw new __RESPONSE.BadRequestError({
         message: "Mật khẩu không đúng - Invalid password",
         suggestion: "Please check again your request",
      });
   }

   const khach_hang = await db.khach_hang.findOne({where: {tai_khoan_id: tai_khoan.tai_khoan_id}});
   if (!khach_hang) {
      throw new __RESPONSE.NotFoundError({
         message: "Không tìm thấy thông tin khách hàng - khach_hang not found",
         suggestion: "Please check again your request",
      });
   }

   const privateKey = crypto.randomBytes(64).toString("hex");
   const publicKey = crypto.randomBytes(64).toString("hex");

   const tokens = await createTokenPair(
      {
         tai_khoan_id: tai_khoan.tai_khoan_id,
         ma_khach_hang: khach_hang.ma_khach_hang,
         ten_khach_hang: khach_hang.ten_khach_hang,
         dien_thoai: khach_hang.dien_thoai,
         dia_chi: khach_hang.dia_chi,
      },
      publicKey,
      privateKey
   );

   await createKeyToken({
      userId: tai_khoan.tai_khoan_id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
   })
      .then((keyToken) => {
         if (!keyToken) {
            throw new __RESPONSE.BadRequestError({
               message: "Lỗi tạo token - Error creating token",
               suggestion: "Please check again your request",
            });
         }
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.BadRequestError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Lỗi tạo token - Error creating token",
            suggestion: "Please check again your request",
         });
      });
   return {
      khach_hang: getInfoCustomer({
         fileds: ["tai_khoan_id", "ma_khach_hang", "ten_khach_hang", "dien_thoai", "dia_chi"],
         object: khach_hang,
      }),
      tokens,
   };
};

const getAccId = async (req) => {
   const {accId} = req.params;
   if (!accId) {
      throw new __RESPONSE.BadRequestError({
         message: "Thiếu thông tin - Missing information - accId",
         suggestion: "Please check again your request",
      });
   }
   const tai_khoan = await db.tai_khoan.findOne({where: {tai_khoan_id: accId}});
   if (!tai_khoan) {
      throw new __RESPONSE.UnauthorizedError({
         message: "Không tìm thấy tài khoản - tai_khoan not found",
         suggestion: "Please check again your request",
      });
   }
   const khach_hang = await db.khach_hang.findOne({where: {tai_khoan_id: tai_khoan.tai_khoan_id}});
   if (!khach_hang) {
      throw new __RESPONSE.UnauthorizedError({
         message: "Không tìm thấy thông tin khách hàng - khach_hang not found",
         suggestion: "Please check again your request",
      });
   }
   return {
      khach_hang: getInfoCustomer({
         fileds: ["tai_khoan_id", "ma_khach_hang", "ten_khach_hang", "dien_thoai", "dia_chi"],
         object: khach_hang,
      }),
   };
};

const createAccount = async (req, res) => {
   const {username, password, name, phone} = req.body;
   if (!username) {
      throw new __RESPONSE.BadRequestError({
         message: "Thiếu thông tin - Missing information - username",
         suggestion: "Please check again your request",
      });
   }

   if (!password) {
      throw new __RESPONSE.BadRequestError({
         message: "Thiếu thông tin - Missing information - password",
         suggestion: "Please check again your request",
      });
   } else if (password.length < 6) {
      throw new __RESPONSE.BadRequestError({
         message: "Mật khẩu phải có ít nhất 6 ký tự",
         suggestion: "Please check again your request",
      });
   } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      throw new __RESPONSE.BadRequestError({
         message: "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
         suggestion: "Please check again your request",
      });
   }

   if (!name) {
      throw new __RESPONSE.BadRequestError({
         message: "Thiếu thông tin - Missing information - name",
         suggestion: "Please check again your request",
      });
   }

   if (!phone) {
      throw new __RESPONSE.BadRequestError({
         message: "Thiếu thông tin - Missing information - phone",
         suggestion: "Please check again your request",
      });
   }

   if (!/^\d{10}$/.test(phone)) {
      throw new __RESPONSE.BadRequestError({
         message: "Số điện thoại không hợp lệ",
         suggestion: "Please check again your request",
      });
   }

   const khach_hang = await db.khach_hang.findOne({where: {dien_thoai: phone}});
   if (khach_hang) {
      throw new __RESPONSE.BadRequestError({
         message: "Số điện thoại đã tồn tại",
         suggestion: "Please check again your request",
      });
   }
   console.log("khach_hang", khach_hang);

   try {
      const tai_khoan = await db.tai_khoan.findOne({where: {ten_dang_nhap: username}});
      if (tai_khoan) {
         throw new __RESPONSE.BadRequestError({
            message: "Tài khoản đã tồn tại",
            suggestion: "Please check again your request",
         });
      }
      const hashPassword = await bycrypt.hash(password, 10);
      const newTaiKhoan = await db.tai_khoan.create({
         ten_dang_nhap: username,
         mat_khau_hash: hashPassword,
         hoat_dong: true,
      });

      if (!newTaiKhoan) {
         throw new __RESPONSE.BadRequestError({
            message: "Lỗi tạo tài khoản - Error creating account",
            suggestion: "Please check again your request",
         });
      }

      const newKhachHang = await db.khach_hang.create({
         ten_khach_hang: name,
         dien_thoai: phone,
         tai_khoan_id: newTaiKhoan.tai_khoan_id,
      });

      if (!newKhachHang) {
         await newTaiKhoan.destroy();
         throw new __RESPONSE.BadRequestError({
            message: "Lỗi tạo thông tin khách hàng - Error creating customer information",
            suggestion: "Please check again your request",
         });
      }

      const newGioHang = await db.gio_hang.create({
         ma_khach_hang: newKhachHang.ma_khach_hang,
      });

      if (!newGioHang) {
         throw new __RESPONSE.BadRequestError({
            message: "Lỗi tạo giỏ hàng - Error creating cart",
            suggestion: "Please check again your request",
         });
      }

      return {
         khach_hang: {
            tai_khoan_id: newTaiKhoan.tai_khoan_id,
            ma_khach_hang: newKhachHang.ma_khach_hang,
            gio_hang_id: newGioHang.gio_hang_id,
         },
      };
   } catch (error) {
      console.log("error ssssssssssssssssssssssssssssssss              ", error);
   }
};

module.exports = {logOut, signIn, handlerRefreshToken, getAccId, createAccount};
