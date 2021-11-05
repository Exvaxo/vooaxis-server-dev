const { Schema, model } = require("mongoose");

const mediaSchema = new Schema(
  {
    type: {
      type: String,
    },
    name: {
      type: String,
    },
    url: {
      type: String,
    },
    ref: {
      type: String,
    },
    folder: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Media = model("Media", mediaSchema);

module.exports = Media;
