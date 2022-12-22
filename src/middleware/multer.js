import multer from "multer";
import path from "path";

// Multers disk storage settings
const storage = multer.diskStorage({
  destination: (req, res, done) => {
    done(null, "src/public/uploads");
  },
  filename: (req, file, done) => {
    done(null, file.originalname);
  },
});
// Multer settings for single upload
const upload = multer({
  storage,
  fileFilter: (req, file, done) => {
    let ext = path.extname(file.originalname);
    //Only allow jpg, jpeg, and png

    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      done(new Error("File type is not supported"), false);
      return;
    }
    done(null, true);
  },
});





// Middleware to upload a single file
function uploadFile(req, res, next) {
  const uploadSingle = upload.single("image");

  uploadSingle(req, res, (err) => {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/api");
    }
    // No error occured.
    return next();
  });
}

export default uploadFile;
