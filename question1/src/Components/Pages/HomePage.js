/* eslint-disable no-unused-vars */
import { setPlace, clearPlace } from "../../utils/places";
import Navigate from '../Router/Navigate';
import { clearPage } from "../../utils/render";

const HomePage = () => {
  clearPage();
  getHomePage();
};

function getHomePage() {
  const main = document.querySelector('main');
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const div3 = document.createElement('div');
  const div4 = document.createElement('div');
  const div5 = document.createElement('div');
  const div6 = document.createElement('div');
  div1.id = 'div1';
  div2.id = 'div2';
  div3.id = 'div3';
  div4.id = 'div4';
  div5.id = 'div5';
  div6.id = 'div6';
  div1.innerHTML = `<h1> Places to visit!  </h1>`;
  
  div2.innerHTML = "Berlin";
  div2.addEventListener('click', () => {
    
    setPlace("Berlin");
    Navigate("/photos");
   
  });

  div3.innerHTML = "Bruges";
  div3.addEventListener('click', () => {
    setPlace("Bruges");
    Navigate("/photos");
   
  });

  div4.innerHTML = "Munich";
  div4.addEventListener('click', () => {
    setPlace("Munich");
    Navigate("/photos");
   
  });

  div5.innerHTML = "Paris";
  div5.addEventListener('click', () => {
    setPlace("Paris");
    Navigate("/photos");
   
  });

  div6.innerHTML = "Rome";
  div6.addEventListener('click', () => {
    setPlace("Rome");
    Navigate("/photos");
   
  });


  main.appendChild(div1);
  main.appendChild(div2);
  main.appendChild(div3);
  main.appendChild(div4);
  main.appendChild(div5);
  main.appendChild(div6);
}

export default HomePage;
