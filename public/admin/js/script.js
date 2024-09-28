//Button Status
const buttonStatus = document.querySelectorAll("[button-status]"); // Lấy tất cả các phần tử có thuộc tính 'button-status'
if (buttonStatus.length > 0) {
  // Kiểm tra xem có nút nào tồn tại không
  let url = new URL(window.location.href); // Lấy URL hiện tại
  buttonStatus.forEach((button) => {
    // Duyệt qua từng nút
    button.addEventListener("click", () => {
      // Thêm sự kiện 'click' cho nút
      const status = button.getAttribute("button-status"); // Lấy giá trị trạng thái từ thuộc tính 'button-status'

      if (status) {
        url.searchParams.set("status", status); // Thêm hoặc thay đổi tham số 'status' trong URL
      } else {
        url.searchParams.delete("status"); // Xóa tham số 'status' khỏi URL nếu không có trạng thái
      }
      window.location.href = url.href; // Điều hướng đến URL mới
    });
  });
}
//End Button Status

//Form Search
const formSearch = document.querySelector("#form-search"); // Tìm form có ID 'form-search'
if (formSearch) {
  // Kiểm tra nếu form tồn tại
  let url = new URL(window.location.href); // Lấy URL hiện tại
  formSearch.addEventListener("submit", (e) => {
    // Gắn sự kiện 'submit' cho form
    e.preventDefault(); // Ngăn hành động mặc định của form
    const keyword = e.target.elements.keyword.value; // Lấy giá trị từ trường 'keyword'
    if (keyword) {
      url.searchParams.set("keyword", keyword); // Thêm tham số 'keyword' vào URL
    } else {
      url.searchParams.delete("keyword"); // Xóa tham số 'keyword' nếu không có từ khóa
    }
    window.location.href = url.href; // Điều hướng đến URL mới
  });
}

//End Form Search

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]"); // Lấy tất cả các nút có thuộc tính 'button-pagination'
if (buttonPagination) {
  // Kiểm tra nếu có nút phân trang tồn tại
  let url = new URL(window.location.href); // Lấy URL hiện tại
  buttonPagination.forEach((button) => {
    // Duyệt qua từng nút
    button.addEventListener("click", () => {
      // Gắn sự kiện 'click' cho nút
      const page = button.getAttribute("button-pagination"); // Lấy giá trị trang từ thuộc tính 'button-pagination'
      url.searchParams.set("page", page); // Thêm hoặc thay đổi tham số 'page' trong URL
      window.location.href = url.href; // Điều hướng đến trang mới
    });
  });
}
//End Pagination

//CheckBox Multi
const checkBoxMulti = document.querySelector("[checkbox-multi]"); // Lấy phần tử có thuộc tính 'checkbox-multi'
if (checkBoxMulti) {
  // Kiểm tra nếu phần tử tồn tại
  const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']"); // Lấy checkbox để chọn tất cả
  const inputsId = checkBoxMulti.querySelectorAll("input[name='id']"); // Lấy tất cả các checkbox từng mục

  inputCheckAll.addEventListener("click", () => {
    // Gắn sự kiện 'click' cho checkbox chọn tất cả
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      }); // Chọn tất cả các mục
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      }); // Bỏ chọn tất cả các mục
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      // Gắn sự kiện 'click' cho từng checkbox
      const countChecked = checkBoxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length; // Đếm số checkbox đã chọn
      inputCheckAll.checked = countChecked == inputsId.length; // Nếu chọn hết, đánh dấu checkbox chọn tất cả, ngược lại thì bỏ dấu
    });
  });
}
//End CheckBox Multi

//Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]"); // Lấy form có thuộc tính 'form-change-multi'
if (formChangeMulti) {
  // Kiểm tra nếu form tồn tại
  formChangeMulti.addEventListener("submit", (e) => {
    // Gắn sự kiện 'submit' cho form
    e.preventDefault(); // Ngăn hành động mặc định của form

    const checkboxMulti = document.querySelector("[checkbox-multi]"); // Lấy phần tử 'checkbox-multi'
    const inputsChecked = checkBoxMulti.querySelectorAll(
      "input[name='id']:checked"
    ); // Lấy tất cả checkbox đã chọn

    const typeChange = e.target.elements.type.value; // Lấy giá trị của hành động cần thực hiện (xóa, thay đổi vị trí,...)
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Có chắc là muốn xóa!!!!"); // Hộp thoại xác nhận trước khi xóa
      if (!typeChange) {
        return;
      }
    }

    if (inputsChecked.length > 0) {
      // Kiểm tra nếu có mục nào được chọn
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']"); // Lấy trường input chứa danh sách các ID
      inputsChecked.forEach((input) => {
        const id = input.value; // Lấy ID của mục

        if (typeChange == "change-positon") {
          // Nếu hành động là thay đổi vị trí
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value; // Lấy giá trị vị trí
          ids.push(`${id}-${position}`); // Thêm ID và vị trí vào danh sách
        } else {
          ids.push(id); // Chỉ thêm ID vào danh sách
        }
      });

      inputIds.value = ids.join(","); // Chuyển danh sách các ID thành chuỗi và gán vào trường 'ids'
      formChangeMulti.submit(); // Gửi form
    } else {
      alert("Vui lòng chọn ít nhất 1 bảng ghi!!!!!"); // Thông báo nếu không có mục nào được chọn
    }
  });
}

//End Form Change Multi

// Show Alert
const showAlert = document.querySelector("[show-alert]"); // Lấy phần tử có thuộc tính 'show-alert'
if (showAlert) {
  // Kiểm tra nếu phần tử tồn tại
  const time = parseInt(showAlert.getAttribute("data-time")); // Lấy giá trị thuộc tính 'data-time' và chuyển đổi thành số nguyên
  const closeAlert = showAlert.querySelector("[close-alert]"); // Lấy nút đóng thông báo

  setTimeout(() => {
    // Đặt thời gian trễ để ẩn thông báo
    showAlert.classList.add("alert-hidden"); // Thêm lớp 'alert-hidden' để ẩn thông báo sau khoảng thời gian đã chỉ định
  }, time);

  closeAlert.addEventListener("click", () => {
    // Gán sự kiện 'click' cho nút đóng thông báo
    showAlert.classList.add("alert-hidden"); // Thêm lớp 'alert-hidden' để ẩn thông báo khi người dùng nhấp vào nút đóng
  });
}
// End Show Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]"); // Lấy phần tử có thuộc tính 'upload-image'
if (uploadImage) {
  // Kiểm tra nếu phần tử tồn tại
  const uploadImageInput = document.querySelector("[upload-image-input]"); // Lấy input để chọn hình ảnh
  const uploadImagePreview = document.querySelector("[upload-image-preview]"); // Lấy phần tử để hiển thị hình ảnh xem trước

  uploadImageInput.addEventListener("change", (e) => {
    // Gán sự kiện 'change' cho input chọn hình ảnh
    console.log(e); // In đối tượng sự kiện ra console để kiểm tra
    const file = e.target.files[0]; // Lấy tệp hình ảnh được chọn từ đối tượng sự kiện
    if (file) {
      // Nếu có tệp hình ảnh được chọn
      uploadImagePreview.src = URL.createObjectURL(file); // Tạo URL tạm thời cho hình ảnh và đặt làm nguồn cho phần tử xem trước
    }
  });
}
// End Upload Image
