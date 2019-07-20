const userRouter = require('express').Router();
const Todo = require('../models/todoModel');

userRouter.get('/', async (req, res) => {
  const todos = await Todo.find({});
  return res.json(todos);
});

userRouter.post('/create', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });
  await newTodo.save();
  return res.json(newTodo);
});

userRouter.post('/:todoId/completed', async (req, res) => {
  const todo = await Todo.findById(req.params.todoId);
  todo.isCompleted = !todo.isCompleted;
  await todo.save();
  return res.json({ todoId: req.params.todoId });
});

userRouter.post('/:todoId/delete', async (req, res) => {
  const todo = await Todo.findById(req.params.todoId);
  await todo.remove();
  return res.json({ todoId: req.params.todoId });
});

module.exports = userRouter;
