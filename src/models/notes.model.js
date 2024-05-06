import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    course: {
      type: String,
    },
    semister: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
    },
    notesUrl: {
      type: String,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
