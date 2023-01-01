const HomePage = async () => {
  const main = document.querySelector('main');
  const response = await fetch('https://places-exam-api.azurewebsites.net');
  const joke = await response.json();
  main.innerHTML = `
  <div class="alert alert-info"> 
    <h6>${joke}</h6>
    <q>${joke}</q>
  </div>
  `;
};

export default HomePage;
