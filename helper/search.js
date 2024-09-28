module.exports = (query) => {
  // Xuất khẩu một hàm nhận đối số 'query', thường là đối tượng chứa các tham số truy vấn từ URL
  let objectSearch = {
    // Khởi tạo một đối tượng 'objectSearch' với thuộc tính 'keyword' mặc định là chuỗi rỗng
    keyword: "",
  };

  if (query.keyword) {
    // Kiểm tra nếu có tham số 'keyword' trong đối tượng 'query'
    objectSearch.keyword = query.keyword; // Cập nhật thuộc tính 'keyword' của 'objectSearch' với giá trị của tham số 'keyword'

    const regex = new RegExp(objectSearch.keyword, "i"); // Tạo một đối tượng RegExp từ giá trị của 'keyword' với cờ 'i' (không phân biệt chữ hoa chữ thường)
    objectSearch.regex = regex; // Gán đối tượng RegExp vào thuộc tính 'regex' của 'objectSearch'
  }

  return objectSearch; // Trả về đối tượng 'objectSearch' với các thuộc tính đã được cập nhật
};
