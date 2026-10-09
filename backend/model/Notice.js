const mongoose = require("mongoose");


const FileSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});

const NoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    pdf: FileSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", NoticeSchema);
