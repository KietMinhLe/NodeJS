const systemConfig = require("../../config/system.js"); // Import file cấu hình hệ thống, lấy thông tin như prefix URL của admin
const dashboardRoutes = require("./dashboard.route.js"); // Import file định tuyến cho phần dashboard (bảng điều khiển)
const productRoutes = require("./product.route.js"); // Import file định tuyến cho phần quản lý sản phẩm

module.exports = (app) => { // Xuất một hàm để sử dụng trong file chính, hàm này nhận đối số là `app` (ứng dụng Express)
  const PATH_ADMIN = systemConfig.prefixAdmin; // Lấy giá trị `prefixAdmin` từ file cấu hình, chứa prefix cho các URL admin (ví dụ: `/admin`)

  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes); // Đăng ký route cho dashboard, URL là `/admin/dashboard` (nếu `prefixAdmin` là `/admin`)

  app.use(PATH_ADMIN + "/products", productRoutes); // Đăng ký route cho sản phẩm, URL là `/admin/products` (nếu `prefixAdmin` là `/admin`)
};
