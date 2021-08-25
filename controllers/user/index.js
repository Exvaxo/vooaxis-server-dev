const signup = require("./signup");
const signin = require("./signin");
const profile = require("./profile");
const logout = require("./logout");
const resetPassword = require("./resetPassword");
const sendResetPasswordToken = require("./sendResetPasswordToken");

module.exports = {
  signup,
  signin,
  profile,
  logout,
  resetPassword,
  sendResetPasswordToken,
};
