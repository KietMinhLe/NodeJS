const express = require("express"); // Import Express framework
const router = express.Router(); // Sử dụng Router của Express để tạo hệ thống định tuyến nhỏ, dùng cho một module

const controller = require("../../controllers/admin/dashboard.controller.js"); // Import controller để xử lý logic cho các route của dashboard

router.get("/", controller.dashboard); // Định nghĩa route cho HTTP GET tại đường dẫn gốc `/`, sẽ gọi đến hàm `dashboard` từ controller

module.exports = router; // Xuất router để dùng trong các file khác (cụ thể là trong file route admin)
