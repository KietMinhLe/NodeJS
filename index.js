const express = require("express"); // Import Express framework để tạo ứng dụng web
const database = require("./config/database.js"); // Import file cấu hình database (khả năng chứa logic kết nối)
const systemConfig = require("./config/system.js"); // Import cấu hình hệ thống, ví dụ như các biến cục bộ của hệ thống
const methodOverride = require("method-override"); // Import method-override để sử dụng các phương thức HTTP khác như PUT, DELETE thông qua HTML forms
const bodyParser = require("body-parser"); // Import body-parser để xử lý dữ liệu form
const cookieParser = require("cookie-parser"); // Import cookie-parser để xử lý cookie
const session = require("express-session"); // Import express-session để quản lý phiên làm việc của người dùng (session)
const flash = require("express-flash"); // Import express-flash để gửi thông báo tạm thời (flash messages)
require("dotenv").config(); // Tải các biến môi trường từ file .env vào process.env

const routeAdmin = require("./routes/admin/index.route.js"); // Import các route dành cho admin từ file định tuyến
const route = require("./routes/client/index.route.js"); // Import các route dành cho client từ file định tuyến

const app = express(); // Tạo một ứng dụng Express
const port = process.env.port; // Lấy giá trị cổng (port) từ biến môi trường trong file .env

app.set("views", `${__dirname}/views`); // Cấu hình đường dẫn đến thư mục views để render giao diện
app.set("view engine", "pug"); // Cấu hình sử dụng Pug làm engine để render HTML

console.log(__dirname);
app.use(express.static(`${__dirname}/public`)); // Thiết lập thư mục public để phục vụ các file tĩnh (CSS, hình ảnh, JS)

app.use(methodOverride("_method")); // Cho phép sử dụng PUT/DELETE trong HTML form bằng cách gửi _method trong form

// Flash messaging (thông báo tạm thời giữa các request)
app.use(cookieParser("keyboard cat")); // Sử dụng cookie-parser để xử lý cookie, với khóa bảo mật là "keyboard cat"
app.use(session({ cookie: { maxAge: 60000 } })); // Cấu hình session với thời gian sống của cookie là 60 giây
app.use(flash()); // Sử dụng flash để tạo các thông báo tạm thời, ví dụ: thông báo lỗi hoặc thành công

app.use(bodyParser.urlencoded({ extended: false })); // Cấu hình body-parser để xử lý dữ liệu form theo chuẩn application/x-www-form-urlencoded

app.locals.prefixAdmin = systemConfig.prefixAdmin; // Thiết lập biến cục bộ `prefixAdmin` từ cấu hình hệ thống để sử dụng trong các view

route(app); // Đăng ký các route cho client
routeAdmin(app); // Đăng ký các route cho admin

database.connet(); // Kết nối đến cơ sở dữ liệu (có thể có lỗi chính tả "connet" -> "connect")

app.listen(port, () => {
  // Lắng nghe kết nối trên cổng `port`
  console.log(`Example app listening on port ${port}`); // In ra thông báo khi ứng dụng chạy
});
