//OOP principle demonstration
class Forecast {
    constructor(){
        this.apiKey = 'us7FuMyljFFu6w7lsfMf2e2RZZqQMwvn';
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }
    async getCities (city) {
        const query = `?apikey=${this.apiKey}&q=${city}`;
        const request = await fetch(this.cityURL + query);
        const data = await request.json();
        return data[0];
    }

    async getWeather(id) {
      const query = `${id}?apikey=${this.apiKey}`;
      const request = await fetch(this.weatherURL + query);
      const data = await request.json();
      return data[0];
    }

    async updateCity (city) { 
        const cityDets = await this.getCities(city);
        const weather = await this.getWeather(cityDets.Key);
      
        return { 
            cityDets: cityDets, 
            weather: weather
        }
    }
};


