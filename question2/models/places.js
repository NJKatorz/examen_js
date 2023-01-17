/* eslint-disable keyword-spacing */
/* eslint-disable indent */
/* eslint-disable eol-last */
const path = require('node:path');
const escape = require('escape-html');
const { v4: uuidv4 } = require('uuid');

const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/places.json');

function readOnePlace(id) {
    const idAsNumber = parseInt(id, 10);
    const places = parse(jsonDbPath);
    const indexOfPlaceFound = places.findIndex((place) => place.id === idAsNumber);
    if (indexOfPlaceFound < 0 || indexOfPlaceFound >= places.length) return undefined;

    return places[indexOfPlaceFound];
}

function createOnePlace(name, description) {
    const places = parse(jsonDbPath);

    const createdPlace = {
        // id: getNextId(),
        id: uuidv4(),
        name: escape(name),
        description: escape(description),
    };

    places.push(createdPlace);

    serialize(jsonDbPath, places);

    return createdPlace;
}
/*
function getNextId() {
    const places = parse(jsonDbPath);
    const lastItemIndex = places?.length !== 0 ? places.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = places[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}
*/

module.exports = {
    createOnePlace,
    readOnePlace,
};