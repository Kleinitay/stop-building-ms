const mongoose = require('mongoose');
const {createUser, userExists, getUsers, loginUser} = require("./logic/logic");

mongoose.connect('mongodb://localhost/user_management_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
}).catch((error) => {
    console.error('Connection to database failed:', error);
});

function registerRoutes(fastify) {
    fastify.post('/register', async (req, res) => {
        try {
            const { username, password } = req.body;
            await createUser(username, password);
            res.status(201).send('User registered successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    fastify.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;
            await loginUser(username, password);
            res.send('Login successful');
        } catch (error) {
            console.error(error);
            res.status(401).send('Invalid credentials');
        }
    });

    fastify.get('/users', async (req, res) => {
        try {
            const users = await getUsers();
            res.send(users);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    fastify.get('/validateUser', async (req, res) => {
        try {
            const { username } = req;
            const userExists = await userExists(username);
            res.send(userExists);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });
}

module.exports = { registerRoutes };
