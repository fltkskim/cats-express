const passport = require("passport");
const { throwError } = require("../utils/error");
const { jwtPassport } = require('../utils/passport')

jwtPassport(passport)

exports.isLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      throwError(403, '로그인 필요')
    }
  })(req, res, next);
};