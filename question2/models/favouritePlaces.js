/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable keyword-spacing */
/* eslint-disable indent */
/* eslint-disable eol-last */
const path = require('node:path');
const escape = require('escape-html');
const { readOnePlace } = require('./places');
const { readAllUsers } = require('./users');

const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/favoritelaces.json');

function addAFavoritePlace(idUser, idPlace) {
    const favoritePlaces = parse(jsonDbPath);
    const user = readAllUsers(idUser);
    const place = readOnePlace(idPlace);
    if (idUser !== user.id || idPlace !== place.id) return undefined;
    const createdFavPlace = {
        id: getNextId(),
        idUser,
        idPlace,
    };

    favoritePlaces.push(createdFavPlace);

    serialize(jsonDbPath, favoritePlaces);

    return createdFavPlace;
}

function getNextId() {
    const favoritePlaces = parse(jsonDbPath);
    const lastItemIndex = favoritePlaces?.length !== 0 ? favoritePlaces.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = favoritePlaces[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}

function readIdFavPlace(id) {
    const idAsNumber = parseInt(id, 10);
    const favoritePlaces = parse(jsonDbPath);
    const indexFavPlaceFound = favoritePlaces.findIndex((favPlace) => favPlace.id === idAsNumber);
    if (indexFavPlaceFound < 0 || indexFavPlaceFound >= favoritePlaces.length) return undefined;

    return favoritePlaces[indexFavPlaceFound];
}

module.exports = {
    addAFavoritePlace,
    readIdFavPlace,
};