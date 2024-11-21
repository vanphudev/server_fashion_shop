"use strict";
const __RESPONSE = require("../../core");
const db = require("../../models");

const createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {
   return await db.key_store
      .upsert({
         tai_khoan_id: userId,
         public_key: publicKey,
         private_key: privateKey,
         refresh_token: refreshToken,
      })
      .then(([keyStore, created]) => {
         if (!keyStore) {
            throw new __RESPONSE.BadRequestError({
               message: "Lỗi tạo token - Error creating token",
               suggestion: "Please check again your request",
            });
         }
         return {
            keyStore,
            created,
         };
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.BadRequestError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Lỗi tạo token - Error creating token - " + error.message,
            suggestion: "Please check again your request",
         });
      });
};

const findTokenByCustomerId = async (tai_khoan_id) => {
   return await db.key_store
      .findOne({where: {tai_khoan_id: tai_khoan_id}})
      .then((keyStore) => {
         return keyStore;
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Lỗi tìm token - Error finding token - " + error.message,
            suggestion: "Please check again your request",
         });
      });
};

const removeKeyByCustomerId = async (tai_khoan_id) => {
   const keyStore = await db.key_store.findOne({where: {tai_khoan_id: tai_khoan_id}});
   await db.refresh_key_used.destroy({where: {key_store_id: keyStore.id}});

   return await db.key_store
      .destroy({where: {tai_khoan_id: tai_khoan_id}})
      .then((deletedCount) => {
         if (deletedCount === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Không tìm thấy token - Token not found",
               suggestion: "Please check again your request",
            });
         }
         return {deletedCount};
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Lỗi xóa token - Error deleting token - " + error.message,
            suggestion: "Please check again your request",
         });
      });
};

const findRefreshTokenUsed = async (refreshToken, id) => {
   return await db.refresh_key_used
      .findOne({where: {refresh_token: refreshToken, key_store_id: id}})
      .then((refreshTokenUsed) => {
         return refreshTokenUsed;
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Lỗi tìm refresh token đã dùng - Error finding refresh token used - " + error.message,
            suggestion: "Please check again your request",
         });
      });
};

module.exports = {
   createKeyToken,
   findTokenByCustomerId,
   removeKeyByCustomerId,
   findRefreshTokenUsed,
};
