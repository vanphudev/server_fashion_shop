const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");
const __RESPONSE = require("../core/");
require("dotenv").config();
const crypto = require("crypto");
const {normalizeVietnameseString} = require("./normalizeVietnameseString");

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createUploadMiddleware = ({maxFiles = 5, customFolder = "others"}) => {
   const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: async (req, file) => {
         const dynamicFolder = process.env.CLOUDINARY_CLOUD_FOLDER + customFolder;
         return {
            folder: dynamicFolder,
            format: file.mimetype.split("/")[1],
            public_id: `${Date.now()}_${normalizeVietnameseString(req.body.officeName)}_${normalizeVietnameseString(
               req.params.officeId
            )}_${crypto.randomBytes(32).toString("hex")}`,
            allowed_formats: ["jpg", "png", "jpeg", "svg", "webp", "ico"],
         };
      },
   });

   const uploadMultiple = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
         if (file.mimetype.startsWith("image/")) {
            cb(null, true);
         } else {
            cb(new Error("Chỉ chấp nhận file hình ảnh!"), false);
         }
      },
      limits: {
         fileSize: 6 * 1024 * 1024,
      },
   }).array("images", maxFiles);

   return async (req, res, next) => {
      try {
         uploadMultiple(req, res, async function (err) {
            if (err) {
               throw new __RESPONSE.BadRequestError({
                  message: "Lỗi khi upload ảnh - " + err.msg,
                  reason: err.msg,
                  suggestion: "Vui lòng kiểm tra lại file upload",
                  request: req,
               });
            }
            if (!req.files || req.files.length === 0) {
               throw new __RESPONSE.BadRequestError({
                  message: "Không có file nào được upload",
                  reason: "No files uploaded",
                  suggestion: "Vui lòng chọn ít nhất một file ảnh",
                  request: req,
               });
            }

            const uploadedFiles = req.files;
            req.uploadedImages = uploadedFiles.map((file) => ({
               url: file.path,
               public_id: file.filename,
               original_name: file.originalname,
            }));
            next();
         });
      } catch (error) {
         next(error);
      }
   };
};

module.exports = {createUploadMiddleware};
