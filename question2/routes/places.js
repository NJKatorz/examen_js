/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable space-in-parens */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const express = require('express');

const { readOnePlace, createOnePlace } = require('../models/places');
const { addAFavoritePlace, readIdFavPlace } = require('../models/favouritePlaces');

const router = express.Router();

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  const placeFound = readOnePlace(req.params.id);
  if (!placeFound) return res.sendStatus(404);
  return res.json(placeFound);
});

// Create a pizza to be added to the menu.
router.post('/create', (req, res) => {
  const name = req?.body?.name?.length !== 0 ? req.body.name : undefined;

  const description = req?.body?.description?.length !== 0 ? req.body.description : undefined;

  if (!name || !description) return res.sendStatus(400);

  const placeCreated = createOnePlace(name, description);
  return res.json(placeCreated);
});

router.post('/addAFavoritePlace', (req, res) => {
  const idUser = typeof req?.body?.idUser !== 'number' || req.body.idUser < 0 ? undefined : req.body.idUser;

  const idPlace = typeof req?.body?.idPlace !== 'number' || req.body.idPlace < 0 ? undefined : req.body.idPlace;

  if (!idUser || !idPlace) return res.sendStatus(400);

  const favoritePlaceCreated = addAFavoritePlace(idUser, idPlace);

  return res.json(favoritePlaceCreated);
});

module.exports = router;
