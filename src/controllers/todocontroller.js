import Todo from "../models/Todo.js";
import mongoose from "mongoose";

const controllers = {
  getAllTodos: (req, res) => {
    Todo.find()
      .sort({ createdAt: -1 })
      .lean()
      .then((todos) => {
        res.status(200).json(todos);
      })
      .catch((err) => res.status(400).json(err));
  },
  getSingleTodo: (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ err: "No Todo Found" });

    Todo.findById(id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).json({ err: "No Todo found in db" });
        }
        res.status(200).json(todo);
      })
      .catch((err) => res.status(400).json(err));
  },
  createTodo: (req, res) => {
    const { title, description } = req.body;
    if (!title || !description)
      return res.status(400).json({ err: "Please fill out a proper form" });

    Todo.create({ title, description })
      .then((todo) => {
        console.log(todo);
        res.status(200).json(todo);
      })
      .catch((err) => res.status(400).json({ err: err.message }));
  },
  updateTodo: (req, res) => {
    const { id } = req.params;

    if (!req.body.title && !req.body.description) {
      return res.status(400).json({ err: "Invalid form body" });
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ err: "No Todo Found" });

    Todo.findByIdAndUpdate(id, { ...req.body }, { new: true })
      .then((todo) => {
        if (!todo) {
          return res.status(404).json({ err: "No Todo found in db" });
        }
        res.status(200).json(todo);
      })
      .catch((err) => res.status(400).json({ err: err.message }));
  },
  deleteTodo: (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ err: "No Todo Found" });

    Todo.findByIdAndDelete(id)
      .then((todo) => {
        if (!todo) return res.status(404).json({ err: "No Todo Found" });

        res.status(200).json({ msg: "Todo item deleted" });
      })
      .catch((err) => res.status(400).json(err.message));
  },
};

export default controllers