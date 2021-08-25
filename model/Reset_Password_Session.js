const { Schema, model } = require("mongoose");

const ResetPasswordSessionSchema = new Schema({
  token: String, // String is shorthand for {type: String}
  uid: String,
  expireAt: Date,
});

ResetPasswordSessionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const ResetPasswordSession = model(
  "Reset_Password_Session",
  ResetPasswordSessionSchema
);

module.exports = ResetPasswordSession;
