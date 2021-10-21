const signup = require("./signup");
const signin = require("./signin");
const profile = require("./profile");
const logout = require("./logout");
const getStaffDetail = require("./getStaffDetail");
const getAllStaffs = require("./getAllStaffs");
const resetPassword = require("./resetPassword");
const sendResetPasswordToken = require("./sendResetPasswordToken");

module.exports = {
  signup,
  signin,
  profile,
  logout,
  getStaffDetail,
  getAllStaffs,
  resetPassword,
  sendResetPasswordToken,
};
