//My weather app 
const search = document.querySelector('.change-location'); //form
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon');
const forecast = new Forecast();

//update ui
const updateUI = (data) => {
  const cityDets = data.cityDets; //object within object
  const weather = data.weather;

  details.innerHTML = `
  <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
              </div>
  `;
  if(card.classList.contains('d-none')){
      card.classList.remove('d-none');
  };
  //Update night and day icon and images
  if(weather.IsDayTime === true){
    time.setAttribute('src', 'img/day.svg')
  } else {
    time.setAttribute('src', 'img/night.svg')
  }
   const weatherIcon = weather.WeatherIcon;
   icon.innerHTML = `<img src="img/icons/${weatherIcon}.svg">`;
};


//City Search Function
search.addEventListener('submit', (e) => {
    e.preventDefault();
    let city = search.children[1].value.trim();
    forecast.updateCity(city)
    .then(data => {
        updateUI(data)})
    .catch(err => console.log(err));
    //Setting the search queries in local storage
    localStorage.setItem('location', city);

    search.reset();
});

//Enable local storage to populate city search
if(localStorage.getItem('location')){
  forecast.updateCity(localStorage.getItem('location'))
    .then(data => {
        updateUI(data)})
    .catch(err => console.log(err));
};
