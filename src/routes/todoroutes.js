import { Router } from "express";
import Todo from "../models/Todo.js";
import mongoose from "mongoose";
import controllers from "../controllers/todocontroller.js";
import {isAuthenticated, isAuth} from "../middleware/auth.js";

const { getAllTodos, getSingleTodo, createTodo, updateTodo, deleteTodo } = controllers

const router = Router();


router.use(isAuth)

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
