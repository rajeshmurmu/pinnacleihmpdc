import Note from "../models/notes.model.js";

const uploadNotes = async (req, res) => {
  const { title, subject, course, semister, unit } = req.body;

  if (!title || !subject || !semister || !unit || !course) {
    return res.render("student-corner/notes/uploadNotes", {
      alert: "All Fields Are Required.",
      redirectUrl: "/student-corner/notes/upload",
    });
  }
  try {
    let localFilePath = "/uploads/notes/" + req.file.filename;
    const user = req.user.firstName + " " + req.user.lastName;
    console.log(user);

    const notes = new Note({
      title,
      subject,
      course,
      semister,
      unit,
      uploadedBy: req.user._id,
      notesUrl: localFilePath,
    });

    await notes.save();

    if (!notes) {
      return res.render("student-corner/notes/uploadNotes", {
        alert: "Please Try Again",
        redirectUrl: "student-corner/notes/uploadNotes",
      });
    }

    return res.render("student-corner/notes/uploadNotes", {
      alert: "Notes Uploaded Successfully",
      redirectUrl: "/student-corner/notes/",
    });
  } catch (error) {
    console.log("Error While Uploading Notes", error);
    return res.render("student-corner/notes/uploadNotes", {
      alert: "Error While Uploading Notes",
      redirectUrl: "/student-corner/notes/upload",
    });
  }
};

export { uploadNotes };
