const { Schema, model } = require("mongoose");

const permissionSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  description: String,
  permissions: {
    type: "object",
  },
});

const Permission = model("Permission", permissionSchema);

module.exports = Permission;
