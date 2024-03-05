const fastify = require('fastify')();
const mongoose = require('mongoose');
const { createTodo, updateTodo, deleteTodo, getTodos } = require('./logic/todoLogic');

mongoose.connect('mongodb://localhost/user_management_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
}).catch((error) => {
    console.error('Connection to database failed:', error);
});

function registerRoutes(fastify) {
    fastify.post('/todos', async (req, res) => {
        try {
            const {userId, text} = req.body;
            await createTodo(userId, text);
            res.status(201).send('Todo created successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    fastify.put('/todos/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const {text} = req.body;
            await updateTodo(id, text);
            res.send('Todo updated successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    fastify.delete('/todos/:id', async (req, res) => {
        try {
            const {id} = req.params;
            await deleteTodo(id);
            res.send('Todo deleted successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    fastify.get('/todos/:userId', async (req, res) => {
        try {
            const {userId} = req.params;
            const todos = await getTodos(userId);
            res.send(todos);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });
}

module.exports = { registerRoutes };

