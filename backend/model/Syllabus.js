const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});

const SyllabusSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    semester: { type: String, required: true },
    year: { type: Number, required: true },
    branch: {
      type: String,
      enum: [
        "COMPUTER SCIENCE ENGINEERING",
        "MECHANICAL ENGINEERING",
        "ELECTRICAL ENGINEERING",
        "CIVIL ENGINEERING",
        "ELECTRONICS AND COMMUNICATION ENGINEERING",
      ],
      required: true,
    },
    // pdf: FileSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Syllabus", SyllabusSchema);
