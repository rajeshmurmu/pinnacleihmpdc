import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    semister: {
      type: String,
      required: true,
    },
    unit: {
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
