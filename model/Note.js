const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  body: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Note = model("Note", noteSchema);

module.exports = Note;
