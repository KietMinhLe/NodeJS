module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", `Bạn hãy nhập tiêu đề !!!`);
    res.redirect("back");
    return;
  }
  next();
};
