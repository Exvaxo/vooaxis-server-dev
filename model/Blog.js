const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
  documentId: {
    type: String,
    unique: true,
  },
  title: String, // String is shorthand for {type: String}
  slug: String,
  thumbnail: String,
  category: String,
  subTitle: String,
  body: String,
  staff: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
  },
});

const Blog = model("Blog", blogSchema);

module.exports = Blog;
