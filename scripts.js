// Variáveis e seletores
const apiKey = "a969a817118acac33e7545ac793f7c6a";
const apiCountryURL = "https://www.countryflagicons.com/SHINY/32/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherDataElement = document.querySelector("#weather-data");



// Funções

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data);
    return data;
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    weatherDataElement.removeAttribute("class", "hide");
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data.sys.country + ".png");
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
}


// Eventos
searchBtn.addEventListener("click", (e) => {

    e.preventDefault();
    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keypress", (e) => {

    
    if (e.code === "Enter") {
        e.preventDefault();

        const city = e.target.value;

        showWeatherData(city);
    }
});
