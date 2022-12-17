import Todo from "../models/Todo.js";
import mongoose from "mongoose";
import User from "../models/User.js";

const controllers = {
  getAllTodos: (req, res) => {
    const { id } = req.user;
    Todo.find({ authorID: id })
      .sort({ createdAt: -1 })
      .lean()
      .then((todos) => {
        res.status(200).render('secure/profile', {todos, user: req.user})
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
        if (req.user.id != todo.authorID) return res.sendStatus(401);
        res.status(200).render('secure/todo', {todo, user: req.user})
      })
      .catch((err) => res.status(400).json(err));
  },
  createTodo: (req, res) => {
    const { title, description } = req.body;
    const { id: authorID } = req.user;
    if (!title || !description)
      return res.status(400).json({ err: "Please fill out a proper form" });

    Todo.create({ title, description, authorID })
      .then((todo) => {
        console.log(todo);
        res.redirect('/api');
      })
      .catch((err) => res.status(400).json({ err: err.message }));
  },
  updateTodo: (req, res) => {
    const { id } = req.params;
    const { id: authorID } = req.user;

    if (!req.body.title && !req.body.description) {
      return res.status(400).json({ err: "Invalid form body" });
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ err: "No Todo Found" });

    Todo.findById(id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).json({ err: "No Todo found in db" });
        }
        console.log(todo);
        if (authorID != todo.authorID) return res.sendStatus(401);

        Todo.findByIdAndUpdate(id, { ...req.body }, { new: true })
          .then((update) => {
            res.redirect('/api')
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(400).json({ err: err.message }));
  },
  deleteTodo: (req, res) => {
    const { id } = req.params;
    const { id: authorID } = req.user;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ err: "No Todo Found" });

    Todo.findById(id).then((todo) => {
      if (!todo) return res.status(404).json({ err: "No Todo Found" });
      if (authorID != todo.authorID) return res.sendStatus(401);

      Todo.findByIdAndDelete(id)
        .then((todo) => {
          res.status(200).redirect('/api')
        })
        .catch((err) => res.status(400).json(err.message));
    }).catch(err => res.status(500).json(err))
  },
};

export default controllers;
