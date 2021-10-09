const { Schema, model } = require("mongoose");

const staffSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const Staff = model("Staff", staffSchema);

module.exports = Staff;
