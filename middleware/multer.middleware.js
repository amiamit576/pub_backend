import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";

const imagePath = "C:/Users/amit.kumar20/Desktop/Pub-management/server/assets/images";
const documentPath = "C:/Users/amit.kumar20/Desktop/Pub-management/server/assets/documents";

if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true });
}
if (!fs.existsSync(documentPath)) {
  fs.mkdirSync(documentPath, { recursive: true });
}

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: (_req, file, cb) => {
      let ext = path.extname(file.originalname).toLowerCase();
      if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".webp") {
        cb(null, imagePath);
      } else if (ext === ".pdf" || ext === ".docx") {
        cb(null, documentPath);
      } else {
        cb(new Error("Invalid file type"), false);
      }
    },
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".webp" &&
      ext !== ".pdf" &&
      ext !== ".docx"
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }
    cb(null, true);
  },
});

const app = express();

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded!");
    }
    res.status(200).send(`File ${req.file.originalname} uploaded successfully!`);
  } catch (error) {
    res.status(500).send(`Error uploading file: ${error.message}`);
  }
});

app.post("/uploads", upload.array("files", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded!");
    }
    res.status(200).send(`${req.files.length} files uploaded successfully!`);
  } catch (error) {
    res.status(500).send(`Error uploading files: ${error.message}`);
  }
});

export default upload;
