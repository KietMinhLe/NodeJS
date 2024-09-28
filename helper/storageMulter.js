const multer = require("multer"); // Nhập mô-đun 'multer', một thư viện middleware để xử lý tải lên file

module.exports = () => {
  // Xuất khẩu một hàm không nhận đối số, trả về cấu hình lưu trữ cho multer
  const storage = multer.diskStorage({
    // Cấu hình lưu trữ sử dụng phương thức diskStorage của multer
    destination: function (req, file, cb) {
      // Hàm để xác định thư mục lưu trữ file tải lên
      cb(null, "./public/uploads/"); // Gọi callback với giá trị thư mục lưu trữ là "./public/uploads/"
    },
    filename: function (req, file, cb) {
      // Hàm để xác định tên file lưu trữ
      const uniqueSuffix = Date.now(); // Tạo một hậu tố duy nhất dựa trên thời gian hiện tại
      cb(null, `${uniqueSuffix}-${file.originalname}`); // Gọi callback với tên file là hậu tố duy nhất cộng với tên gốc của file
    },
  });
  return storage; // Trả về đối tượng cấu hình lưu trữ đã được thiết lập
};
