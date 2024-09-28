const Product = require("../../models/product.model.js");

const systemConfig = require("../../config/system.js");

const filterStatusHelper = require("../../helper/filterStatus.js");
const searchHelper = require("../../helper/search.js");
const paginationhHelper = require("../../helper/pagination.js");
// [GET] /admin/products
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  //Phần bộ lọc đã được tối ưu
  const filterStatus = filterStatusHelper(req.query);

  //Phần Tìm Kiếm đã được tối ưu
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  ///////// Pagination
  const countProducts = await Product.countDocuments(find);
  let objectPaination = paginationhHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );

  ///////// End Pagination
  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objectPaination.limitItems)
    .skip(objectPaination.skip);

  // console.log(products);
  res.render("./admin/pages/product/index.pug", {
    pageTitle: "Trang Sản Phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPaination,
  });
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  req.flash("success", "Bạn đã cập nhật thành công!!!");

  res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash(
        "success",
        `Bạn đã cập nhật thành công ${ids.lenght} sản phẩm !!!`
      );
      break;

    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `Bạn đã cập nhật thành công ${ids.lenght} sản phẩm !!!`
      );
      break;

    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", "Bạn đã xóa thành công ${ids.lenght} sản phẩm !!!");
      break;

    case "change-positon":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        // console.log(id);
        // console.log(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash(
        "success",
        "Bạn đã cập nhật thành công ${ids.lenght} sản phẩm!!!"
      );
      break;

    default:
      break;
  }

  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // await Product.deleteOne({ _id: id }); //Xóa cứng
  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );
  req.flash("success", "Bạn đã xóa thành công sản phẩm !!!");
  res.redirect("back");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/product/create.pug", {
    pageTitle: "Thêm sản phẩm mới",
  });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
    // console.log(countProducts);
  } else {
    req.body.position = parseInt(req.body.position);
  }

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  const product = new Product(req.body);
  await product.save();

  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    console.log(req.params.id);

    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);

    console.log(product);

    res.render("admin/pages/product/edit.pug", {
      pageTitle: "Chỉnh sửa sản phẩm mới",
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    await Product.updateOne({ _id: id }, req.body);
    req.flash("success", "Bạn đã cập nhật thành công sản phẩm!!!");
  } catch (error) {
    req.flash("error", "Bạn đã cập nhật thành công sản phẩm!!!");
  }

  res.redirect("back");
};

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    console.log(req.params.id);

    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);

    console.log(product);

    res.render("admin/pages/product/detail.pug", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
