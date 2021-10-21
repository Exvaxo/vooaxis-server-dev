const { Schema, model } = require("mongoose");

const staffSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,

  permission: {
    type: Schema.Types.ObjectId,
    ref: "Permission",
  },
});

const Staff = model("Staff", staffSchema);

module.exports = Staff;
