import { filemanager } from "../models/filemanagerschema.js";

const createfilemanagers = async (req, res) => {
  let { name, parentid } = req.body;
  if (!name) {
    return res.status(400).json({ message: "all fields are required" });
  }
  if (parentid === "null") {
    parentid = null;
  }
  let type = "folder";
  let fileurl = "";
  if (req.file) {
    type = "file";
    fileurl = `http://localhost:1212/uploads/${req.file.filename}`;
  }
  const createuser = await filemanager.create({
    name,
    parentid: parentid || null,
    type,
    file: fileurl,
  });
  return res
    .status(200)
    .json({ message: "file created successfully", createuser });
};
const getfilemanagers = async (req, res) => {
  const { id } = req.params;

  let data;
  if (!id) {
    data = await filemanager.find({ parentid: null });
  } else {
    data = await filemanager.find({ parentid: id });
  }
  return res.json(data);
};
const deletefilemanagers = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }
  await filemanager.findByIdAndDelete(id, { new: true });
  return res.status(200).json({ message: "file manager deleted successfully" });
};
const updatefilemanagers = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }
  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }
  const updatedfile = await filemanager.findByIdAndUpdate(
    id,
    { name },
    { new: true },
  );
  return res
    .status(200)
    .json({ message: "file manager updated successfully", updatedfile });
};

export {
  createfilemanagers,
  getfilemanagers,
  updatefilemanagers,
  deletefilemanagers,
};
