const { Schema, model } = require("mongoose");

const mediaBankSchema = new Schema(
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
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const MediaBank = model("MediaBank", mediaBankSchema);

module.exports = MediaBank;
