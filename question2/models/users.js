/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable space-before-blocks */
/* eslint-disable max-len */
/* eslint-disable eol-last */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'ilovemymovies!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, '/../data/users.json');

const defaultUsers = [
    {
        id: 1,
        username: 'admin',
        usermail: 'admin@gmail.com',
        password: bcrypt.hashSync('admin', saltRounds),
    },
];

async function login(username, usermail, password) {
    const userFound = readOneUserFromUsernameOrMail(username);
    if (!userFound) return undefined;

    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) return undefined;

    const token = jwt.sign(
        { username }, // session data added to the payload (payload : part 2 of a JWT)
        jwtSecret, // secret used for the signature (signature part 3 of a JWT)
        { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
    );

    const authenticatedUser = {
        username,
        usermail,
        token,
    };

    return authenticatedUser;
}

async function register(username, usermail, password) {
    const userFound = readOneUserFromUsernameOrMail(username);
    const userMailFound = readOneUserFromUsernameOrMail(usermail);

    if (userFound || userMailFound) return undefined;

    await createOneUser(username, usermail, password);

    const token = jwt.sign(
        { username, usermail }, // session data added to the payload (payload : part 2 of a JWT)
        jwtSecret, // secret used for the signature (signature part 3 of a JWT)
        { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
    );

    const authenticatedUser = {
        username,
        usermail,
        token,
    };

    return authenticatedUser;
}

function readOneUserFromUsernameOrMail(userNameOrMail) {
    const users = parse(jsonDbPath, defaultUsers);
    const indexOfUserFound = users.findIndex((user) => user.username === userNameOrMail || user.usermail === userNameOrMail);
    if (indexOfUserFound < 0) return undefined;

    return users[indexOfUserFound];
}

function readAllUsers(id) {
    const idAsNumber = parseInt(id, 10);
    const users = parse(jsonDbPath);
    const indexUserFound = users.findIndex((user) => user.id === idAsNumber);
    if (indexUserFound < 0 || indexUserFound >= users.length) return undefined;

    return users[indexUserFound];
}

async function createOneUser(username, usermail, password) {
    const users = parse(jsonDbPath, defaultUsers);

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = {
        id: getNextId(),
        username,
        usermail,
        password: hashedPassword,
    };

    users.push(createdUser);

    serialize(jsonDbPath, users);

    return createdUser;
}

function getNextId() {
    const users = parse(jsonDbPath, defaultUsers);
    const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = users[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}

module.exports = {
    login,
    register,
    readOneUserFromUsernameOrMail,
    readAllUsers,
};