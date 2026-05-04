import mongoose from "mongoose";

const filemanagerschema = new mongoose.Schema({
  name: {
    type: String,
  },
  parentid: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  type: {
    type: String,
    enum: ["folder", "file"],
  },
  file: {
    type: String,
  },
});
export const filemanager = mongoose.model("filemanager", filemanagerschema);
