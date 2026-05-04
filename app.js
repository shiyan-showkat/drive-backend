import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import {
  createfilemanagers,
  getfilemanagers,
  updatefilemanagers,
  deletefilemanagers,
} from "./controller/filemanager.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);
mongoose
  .connect(
    "mongodb+srv://shiyan-showkat93_db_user:Gw6tpjFxcq4qQ3UT@cluster0.3wdms78.mongodb.net/todos?retryWrites=true&w=majority",
    {
      tls: true,
      tlsAllowInvalidCertificates: true,
    },
  )
  .then(() => console.log("mongo db connected"))
  .catch((err) => console.log(`mongo db error${err}`));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
});
const upload = multer({ storage });
app.use("/uploads", express.static("uploads"));
app.post("/api/v2/createfile", upload.single("file"), createfilemanagers);
app.get("/api/v2/getfile", getfilemanagers);
app.get("/api/v2/getfile/:id", getfilemanagers);

app.delete("/api/v2/deletefile/:id", deletefilemanagers);
app.put("/api/v2/updatefile/:id", updatefilemanagers);

app.listen(1212, () => {
  console.log(`server is listening on port:${1212}`);
});
