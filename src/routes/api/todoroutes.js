import { Router } from "express";

import controllers from "../../controllers/apicontroller.js";
import { isAuth, jwtAuth, passportAuth } from "../../middleware/auth.js";


const { getAllTodos, getSingleTodo, createTodo, updateTodo, deleteTodo } = controllers

const router = Router();

// *******Authorization Gateway**************
// router.use(isAuth) Vanilla Auth
// router.use(jwtAuth) JWT Auth 
router.use(passportAuth) //Passport Auth


// Get All Todos
router.get("/", getAllTodos);

// Get a Single Todo
router.get("/:id", getSingleTodo);

// Create a Todo
router.post("/", createTodo);

//Update a Todo
router.put("/:id",updateTodo);

//Delete a todo
router.delete("/:id", deleteTodo);

export default router;
