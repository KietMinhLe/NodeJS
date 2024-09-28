const mongoose = require("mongoose"); // Nhập mô-đun 'mongoose', thư viện ODM (Object Data Modeling) cho MongoDB

module.exports.connet = async () => {
  // Xuất khẩu một hàm bất đồng bộ 'connet' để kết nối tới MongoDB
  try {
    // Bắt đầu khối mã try để kiểm tra các lỗi trong quá trình kết nối
    await mongoose.connect(process.env.MONGO_URL); // Kết nối đến MongoDB bằng URL được lưu trong biến môi trường 'MONGO_URL'
    console.log("Connect-Success"); // In ra thông báo "Connect-Success" nếu kết nối thành công
  } catch (error) {
    // Bắt lỗi nếu kết nối không thành công
    console.log("Connect-Erorr!"); // In ra thông báo lỗi "Connect-Erorr!" nếu kết nối gặp sự cố
  }
};
