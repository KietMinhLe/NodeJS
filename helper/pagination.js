module.exports = (objectPagination, query, countProducts) => {
  // Xuất khẩu một hàm nhận ba đối số: 'objectPagination', 'query', và 'countProducts'
  if (query.page) {
    // Kiểm tra nếu có tham số 'page' trong đối tượng 'query'
    objectPagination.currentPage = parseInt(query.page); // Cập nhật trang hiện tại trong đối tượng phân trang với giá trị của tham số 'page', chuyển đổi thành số nguyên
  }

  objectPagination.skip = // Tính toán số mục cần bỏ qua để phân trang
    (objectPagination.currentPage - 1) * objectPagination.limitItems; // Số mục bỏ qua = (trang hiện tại - 1) * số mục mỗi trang
  console.log(objectPagination.skip); // In giá trị số mục bỏ qua ra console để kiểm tra

  const totalPage = Math.ceil(countProducts / objectPagination.limitItems); // Tính toán tổng số trang dựa trên tổng số sản phẩm và số mục mỗi trang
  objectPagination.totalPage = totalPage; // Cập nhật tổng số trang vào đối tượng phân trang

  return objectPagination; // Trả về đối tượng phân trang đã được cập nhật
};
