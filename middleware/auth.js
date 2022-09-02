module.exports = {
  ensureAuth: function (req, res, next) {
    //console.log(req.user, req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
};
