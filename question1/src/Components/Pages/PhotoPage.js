/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { clearPage } from '../../utils/render';
import { getPlace, getNamePlace, getIdPlace } from '../../utils/places';

const main = document.querySelector('main');
const divPhoto = document.createElement('div');
const divName = document.createElement('div');
const divBouton = document.createElement('div');
const divAll = document.createElement('div');
divAll.id = 'divAll';
divPhoto.id = 'divPhoto';
divName.id = 'divName';
divBouton.id = 'divBouton';

const PhotoPage = () => {
  clearPage();
  getPhotoPage();


};

function getPhotoPage() {

  const place = getNamePlace(getPlace());
  let count = place.id;

  divPhoto.innerHTML = `<p><img src="${place.image}"/><p/>`
  divName.innerHTML = `<p>${place.name}<p/>`



  divBouton.innerHTML = `
  <button type ="submbit" id="beforeBtn">Previous</button>
  <button type ="submbit" id="afterBtn">Next</button>
  `

  divAll.appendChild(divPhoto);
  divAll.appendChild(divName);
  divAll.appendChild(divBouton);
  main.appendChild(divAll);


  const beforeButton = document.querySelector('#beforeBtn');
  const afterButton = document.querySelector('#afterBtn');


  beforeButton.addEventListener('click', () => {
    count--;
    previousButton(count);
  });

  afterButton.addEventListener('click', () => {
    count++;
    nextButton(count);
  });


}

function previousButton(nbr) {
  hideShowButtonNextPrevious(nbr);
  let previousPlace = getIdPlace(nbr);
  divPhoto.innerHTML = `<p><img src="${previousPlace.image}"/><p/>`
  divName.innerHTML = `<p>${previousPlace.name}<p/>`

}

function nextButton(nbr) {
  hideShowButtonNextPrevious(nbr);
  let nextPlace = getIdPlace(nbr);
  divPhoto.innerHTML = `<p><img src="${nextPlace.image}"/><p/>`
  divName.innerHTML = `<p>${nextPlace.name}<p/>`

}

function hideShowButtonNextPrevious(count) {
  const beforeButton = document.querySelector('#beforeBtn');
  if (count === 1) {
      beforeButton.style.display = "none";
  } else {
      beforeButton.style.display = "";
  }
  const afterButton = document.querySelector('#afterBtn');
  if (count === 5) {
      afterButton.style.display = "none";
  } else {
      afterButton.style.display = "";
  }
}

export default PhotoPage;
