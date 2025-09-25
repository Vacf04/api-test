import multer from "multer";
import { extname, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const random = () => Math.floor(Math.random() * 10000 + 10000);

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(new Error("Arquivo precisa ser png ou jpg"));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(
        null,
        resolve(
          dirname(fileURLToPath(import.meta.url)),
          "..",
          "..",
          "uploads",
          "images"
        )
      );
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    },
  }),
}).single("foto");

export default upload;
