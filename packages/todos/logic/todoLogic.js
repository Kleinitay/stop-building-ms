const Todo = require('./models/Todo');

async function createTodo(userId, text) {
    const todo = new Todo({ userId, text });
    await todo.save();
}

async function updateTodo(todoId, newText) {
    await Todo.findByIdAndUpdate(todoId, { text: newText });
}

async function deleteTodo(todoId) {
    await Todo.findByIdAndDelete(todoId);
}

async function getTodos(userId) {
    const todos = await Todo.find({ userId });
    return todos;
}

module.exports = { createTodo, updateTodo, deleteTodo, getTodos };