import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.floor(
        Math.random() * (9999 - 1000 + 1) + 1000
      )}-${Math.floor(Math.random() * (999 - 100 + 1) + 100)}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({ storage: storage });

// subir foto

export const subirFoto = upload.single("foto");
