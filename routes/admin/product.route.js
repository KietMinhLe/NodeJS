const express = require("express"); // Import Express framework để tạo ứng dụng web
const multer = require("multer"); // Import Multer để xử lý upload file
const storageMulter = require("../../helper/storageMulter.js"); // Import helper để cấu hình vị trí lưu trữ file khi upload
const router = express.Router(); // Sử dụng Express Router để tạo các route cho sản phẩm
const upload = multer({ storage: storageMulter() }); // Cấu hình Multer với bộ nhớ được cung cấp bởi `storageMulter()`

const controller = require("../../controllers/admin/product.controller.js"); // Import controller để xử lý logic của các route sản phẩm
const validate = require("../../validates/admin/products.validate.js");

router.get("/", controller.index); // Route GET để lấy danh sách sản phẩm (trang chính)

router.patch("/change-status/:status/:id", controller.changeStatus); // Route PATCH để thay đổi trạng thái của sản phẩm (active/inactive)

router.patch("/change-multi", controller.changeMulti); // Route PATCH để thay đổi trạng thái của nhiều sản phẩm cùng lúc

router.delete("/delete/:id", controller.deleteItem); // Route DELETE để xóa sản phẩm theo ID

router.get("/create", controller.create); // Route GET để hiển thị trang tạo sản phẩm mới

router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  controller.createPost
); // Route POST để xử lý việc tạo sản phẩm mới, upload file thumbnail

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router; // Xuất router để dùng trong các file khác
