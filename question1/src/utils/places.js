/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import berlin from '../img/berlin.jpg';
import bruges from '../img/bruges.jpg';
import munich from '../img/munich.jpg';
import paris from '../img/paris.jpg';
import rome from '../img/rome.jpg';

const PHOTOS = [
  {
    id: 1,
    name: 'Berlin',
    image: berlin,
  },
  {
    id: 2,
    name: 'Bruges',
    image: bruges,
  },
  {
    id: 3,
    name: 'Munich',
    image: munich,
  },
  {
    id: 4,
    name: 'Paris',
    image: paris,
  },
  {
    id: 5,
    name: 'Rome',
    image: rome,
  },
];

let place;

const PLACE = '';


const getNamePlace = (name) => {
  for (const i in PHOTOS) {
    if (name === PHOTOS[i].name) {
      return PHOTOS[i];
    }
  }

};

const getIdPlace = (id) => {
  const idAsNumber = parseInt(id, 10);

  const indexOfPlaceFound = PHOTOS.findIndex((photo) => photo.id === idAsNumber);
  if (indexOfPlaceFound < 0 || indexOfPlaceFound >= PHOTOS.length) return undefined;

  return PHOTOS[indexOfPlaceFound];
};

const getPlace = () => {
  place = localStorage.getItem(PLACE);

  if (place === undefined) return;

  return place;

};


const setPlace = (thePlace) => {
  localStorage.setItem(PLACE, thePlace);
};


const isPlace = () => place !== undefined;

const clearPlace = () => {
  localStorage.removeItem(PLACE);
  place = undefined;
};

export { getPlace, setPlace, isPlace, clearPlace, getNamePlace, getIdPlace };
