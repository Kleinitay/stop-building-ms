const { registerRoutes : registerUserRoutes} = require("../../packages/users");
const { registerRoutes : registerTodoRoutes } = require("../../packages/todos");
const fastify = require('fastify')();

registerUserRoutes(fastify);
registerTodoRoutes(fastify);
fastify.listen(3000, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running on ${address}`);
});