module.exports = (query) => {
  // Xuất khẩu một hàm nhận đối số 'query', có thể là đối tượng chứa các tham số truy vấn từ URL
  let filterStatus = [
    // Khởi tạo một mảng chứa các đối tượng trạng thái lọc
    {
      name: "Tất cả", // Tên của trạng thái lọc đầu tiên
      status: "", // Giá trị trạng thái là rỗng, biểu thị tất cả các trạng thái
      class: "", // Lớp CSS áp dụng cho trạng thái này (rỗng)
    },
    {
      name: "Hoạt động", // Tên của trạng thái lọc thứ hai
      status: "active", // Giá trị trạng thái là "active"
      class: "", // Lớp CSS áp dụng cho trạng thái này (rỗng)
    },
    {
      name: "Dừng hoạt động", // Tên của trạng thái lọc thứ ba
      status: "inactive", // Giá trị trạng thái là "inactive"
      class: "", // Lớp CSS áp dụng cho trạng thái này (rỗng)
    },
  ];

  if (query.status) {
    // Kiểm tra xem có tham số 'status' trong đối tượng 'query'
    const index = filterStatus.findIndex((item) => item.status == query.status); // Tìm chỉ số của phần tử trong mảng có giá trị 'status' khớp với tham số 'query.status'
    filterStatus[index].class = "active"; // Đặt lớp CSS của phần tử tìm thấy là "active"
  } else {
    // Nếu không có tham số 'status' trong 'query'
    const index = filterStatus.findIndex((item) => item.status == ""); // Tìm chỉ số của phần tử có giá trị 'status' là rỗng
    filterStatus[index].class = "active"; // Đặt lớp CSS của phần tử tìm thấy là "active"
  }

  return filterStatus; // Trả về mảng 'filterStatus' với trạng thái lọc đã được cập nhật
};
