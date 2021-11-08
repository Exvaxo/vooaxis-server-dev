const { Schema, model } = require("mongoose");

const donationSchema = new Schema(
  {
    documentId: {
      type: String,
      unique: true,
    },
    title: String, // String is shorthand for {type: String}
    slug: String,
    thumbnail: String,
    subtitle: String,
    goal: Number,
    body: String,
    isPublished: {
      type: Boolean,
      default: false,
    },
    isUnderReview: {
      type: Boolean,
      default: false,
    },
    staff: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Donation = model("Donation", donationSchema);

module.exports = Donation;
