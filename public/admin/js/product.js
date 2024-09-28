// Thay đổi trạng thái
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]"); // Lấy tất cả các nút có thuộc tính 'button-change-status'
if (buttonsChangeStatus.length > 0) {
  // Kiểm tra nếu có ít nhất một nút tồn tại
  const formChangeStatus = document.querySelector("#form-change-status"); // Lấy form có ID 'form-change-status'
  const path = formChangeStatus.getAttribute("data-path"); // Lấy giá trị của thuộc tính 'data-path' từ form để sử dụng làm đường dẫn cơ bản
  // console.log(path);

  buttonsChangeStatus.forEach((button) => {
    // Duyệt qua tất cả các nút 'button-change-status'
    button.addEventListener("click", () => {
      // Gắn sự kiện 'click' cho mỗi nút
      const statusCurrent = button.getAttribute("data-status"); // Lấy trạng thái hiện tại (active/inactive) từ thuộc tính 'data-status'
      const id = button.getAttribute("data-id"); // Lấy ID của đối tượng từ thuộc tính 'data-id'

      let statusChange = statusCurrent == "active" ? "inactive" : "active"; // Nếu trạng thái hiện tại là active, đổi thành inactive và ngược lại

      const action = path + `/${statusChange}/${id}?_method=PATCH`; // Xây dựng URL mới để thay đổi trạng thái, dùng PATCH để cập nhật
      formChangeStatus.action = action; // Gán URL vừa tạo vào thuộc tính 'action' của form

      formChangeStatus.submit(); // Gửi form để thực hiện yêu cầu thay đổi trạng thái
    });
  });
}
// End Thay đổi trạng thái

// Delete Item
const buttonsDelete = document.querySelectorAll("[button-delete]"); // Lấy tất cả các nút có thuộc tính 'button-delete'
if (buttonsDelete.length > 0) {
  // Kiểm tra nếu có ít nhất một nút tồn tại
  const formDeleteItem = document.querySelector("#form-delete-status"); // Lấy form có ID 'form-delete-status'
  const path = formDeleteItem.getAttribute("data-path"); // Lấy giá trị của thuộc tính 'data-path' từ form để sử dụng làm đường dẫn cơ bản
  buttonsDelete.forEach((button) => {
    // Duyệt qua tất cả các nút 'button-delete'
    button.addEventListener("click", () => {
      // Gắn sự kiện 'click' cho mỗi nút
      const isConfirm = confirm("Bạn có chắc là muốn xóa !!!"); // Hiển thị hộp thoại xác nhận xóa

      if (isConfirm) {
        // Nếu người dùng xác nhận xóa
        const id = button.getAttribute("data-id"); // Lấy ID của đối tượng từ thuộc tính 'data-id'
        const action = `${path}/${id}?_method=DELETE`; // Xây dựng URL để thực hiện yêu cầu xóa, dùng DELETE để xóa

        formDeleteItem.action = action; // Gán URL vừa tạo vào thuộc tính 'action' của form
        formDeleteItem.submit(); // Gửi form để thực hiện yêu cầu xóa đối tượng
      }
    });
  });
}
//End Delete Item
