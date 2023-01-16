/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable curly */
/* eslint-disable indent */
const HomePage = async () => {
  const main = document.querySelector('main');

  // Tous les lieux | Renvoie : [ { id, name } ]
  const response = await fetch('https://places-exam-api.azurewebsites.net/places');
  const places = await response.json();
  const h1 = document.createElement('h1');
  h1.innerHTML = `Tous les lieux
  `;
  main.appendChild(h1);
  places.forEach((place) => {
    const div2 = document.createElement('div');
    div2.innerHTML = `<div> ${place.name} </div>`;
    main.appendChild(div2);
});

// Le nom du lieu le plus apprécié | Renvoie : { id, name }
const h2 = document.createElement('h1');
  h2.innerHTML = `Lieu le plus apprécié
  `;
  main.appendChild(h2);
  const response2 = await fetch('https://places-exam-api.azurewebsites.net/recommended');
  const places2 = await response2.json();
  const div = document.createElement('div');
  div.innerHTML = `<div> ${places2.name} </div>`;
  main.appendChild(div);
};

export default HomePage;
