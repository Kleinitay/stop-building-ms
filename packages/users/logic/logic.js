const bcrypt = require('bcrypt');
const User = require('../model/user');

async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
}

async function loginUser(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    return user;
}

async function getUsers() {
    const users = await User.find();
    return users;
}

async function userExists(username) {
    const user = await User.findOne({ username });
    return !!user;
}

module.exports = { createUser, loginUser, getUsers, userExists };