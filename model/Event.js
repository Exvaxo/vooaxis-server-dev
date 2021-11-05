const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    documentId: {
      type: String,
      unique: true,
    },

    title: String, // String is shorthand for {type: String}
    subtitle: String,
    slug: String,
    date: Date,
    eventDetails: String,
    thumbnail: String,
    linkType: String,
    link: String,
    informations: [Object],
    tabs: [Object],

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

const Event = model("Event", eventSchema);

module.exports = Event;
