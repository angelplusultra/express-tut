import { Router } from "express";
import cloudinary from "../../config/cloudinary.js";
import { isAuth, jwtAuth, passportAuth } from "../../middleware/auth.js";
import uploadSingleImage from "../../middleware/multer.js";
import User from "../../models/User.js";
import controllers from "../../controllers/apicontroller.js";

const { getAllTodos, getSingleTodo, createTodo, updateTodo, deleteTodo } =
  controllers;

const router = Router();

// *******Authorization Gateway**************
// router.use(isAuth) Vanilla Auth
// router.use(jwtAuth) JWT Auth
router.use(passportAuth); //Passport Auth

// Get All Todos
router.get("/", getAllTodos);

// Get a Single Todo
router.get("/:id", getSingleTodo);

// Create a Todo
router.post("/", createTodo);

//Update a Todo
router.put("/:id", updateTodo);

//Delete a todo
router.delete("/:id", deleteTodo);

router.post("/profilepic", uploadSingleImage, (req, res) => {
  User.findById(req.user.id).then((user) => {
    const { cloudinaryId } = user.profilePicture;
    if (cloudinaryId) {
      cloudinary.uploader
        .destroy(cloudinaryId)
        .then((deleted) => console.log("deleted"))
        .catch((err) => {
          req.flash("error", err.message);
          res.redirect("/api");
        });
    }
  });
  cloudinary.uploader
    .upload(req.file.path, { folder: "Express_Tutorial" })
    .then((image) => {
      User.findByIdAndUpdate(
        req.user.id,
        {
          profilePicture: {
            picturePath: image.secure_url,
            cloudinaryId: image.public_id,
          },
        },
        { new: true }
      ).then((user) => {
        req.flash("success", "Image Uploaded!");
        res.redirect("/api");
      });
    })
    .catch((err) => res.send(err));
});

export default router;
