const { createUser, loginUser, userExists  } = require('./logic/logic');

async function registerUser(username, password) {
    try {
        await createUser(username, password);
        return 'User registered successfully';
    } catch (error) {
        throw new Error(error.message);
    }
}

async function loginUser(username, password) {
    try {
        await loginUser(username, password);
        return 'Login successful';
    } catch (error) {
        throw new Error(error.message);
    }
}

async function validateUser(username) {
    try {
        await userExists(username, password);
        return 'Login successful';
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = { registerUser, loginUser, validateUser };

// const axios = require('axios');
//
// const BASE_URL = 'http://localhost:3000'; // Change this to your server URL

// async function registerUser(username, password) {
//     try {
//         const response = await axios.post(`${BASE_URL}/register`, { username, password });
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response.data);
//     }
// }
//
// async function loginUser(username, password) {
//     try {
//         const response = await axios.post(`${BASE_URL}/login`, { username, password });
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response.data);
//     }
// }
//
// async function validateUser(username) {
//     try {
//         const response = await axios.post(`${BASE_URL}/validateUser`, { username });
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response.data);
//     }
// }