const mongoose = require("mongoose"); // Nhập mô-đun 'mongoose', thư viện ODM cho MongoDB
const slug = require("mongoose-slug-updater"); // Nhập mô-đun 'mongoose-slug-updater', một plugin tạo slug cho MongoDB
mongoose.plugin(slug); // Cài đặt plugin 'slug' cho tất cả các mô hình mongoose

// Định nghĩa schema cho mô hình Product
const productSchema = new mongoose.Schema(
  {
    title: String, // Tên sản phẩm
    price: Number, // Giá sản phẩm
    description: String, // Mô tả sản phẩm
    discountPercentage: Number, // Phần trăm giảm giá
    stock: Number, // Số lượng tồn kho
    thumbnail: String, // Đường dẫn đến hình ảnh thu nhỏ
    status: String, // Trạng thái của sản phẩm
    position: Number, // Vị trí của sản phẩm (có thể dùng cho việc sắp xếp)
    slug: {
      type: String, // Kiểu dữ liệu của trường 'slug'
      slug: "title", // Tạo slug từ trường 'title'
      unique: true, // Đảm bảo rằng giá trị của slug là duy nhất
    },
    deleted: {
      type: Boolean, // Kiểu dữ liệu của trường 'deleted'
      default: false, // Giá trị mặc định của trường 'deleted' là false
    },
    deletedAt: Date, // Thời gian xóa sản phẩm
  },
  {
    timestamps: true, // Tự động thêm các trường 'createdAt' và 'updatedAt'
  }
);

const Product = mongoose.model("Product", productSchema, "products"); // Tạo mô hình Product từ schema và ánh xạ nó với collection 'products'

module.exports = Product; // Xuất khẩu mô hình Product để sử dụng trong các phần khác của ứng dụng
