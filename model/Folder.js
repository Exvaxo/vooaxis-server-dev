const { Schema, model } = require("mongoose");

const folderSchema = new Schema(
  {
    folder_id: {
      type: String,
    },

    folderName: {
      type: String,
    },

    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Folder = model("Folder", folderSchema);

module.exports = Folder;
