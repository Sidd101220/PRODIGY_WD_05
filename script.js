const apiKey = "247f7c7848863e86dba27b3e5f9a3e2a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const cityInput = document.querySelector(".header input");
const button = document.querySelector(".header button");
const invalidDataMsg = document.querySelector(".invaliddata");
const weatherIcon = document.querySelector(".weather-icon");

async function getData(city) {
    const dataResponse = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const response = await dataResponse.json();
    console.log(response);
    if (city === '') {
        invalidDataMsg.style.display = 'block';
        return;
    }
    if (response.cod === '404') {
        invalidDataMsg.style.display = 'block';
        return;
    } else {
        document.querySelector(".temp").innerHTML = Math.round(response.main.temp) + `°c`;
        document.querySelector(".city").innerHTML = response.name;
        document.querySelector(".humidity").innerHTML = response.main.humidity + '%';
        document.querySelector(".wind").innerHTML = Math.round(response.wind.speed) + 'Km/h';
        document.querySelector(".weather").style.display = 'block';
        invalidDataMsg.style.display = 'none';

        switch (response.weather[0].main) {
            case 'Clouds':
                weatherIcon.src = "https://images.unsplash.com/photo-1509803874385-db7c23652552?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdWQlMjBwbmd8ZW58MHx8MHx8fDA%3D";
                break;
            case 'Clear':
                weatherIcon.src = "https://cdn0.iconfinder.com/data/icons/weather-forecast-17/128/forecast-weather_sun-clear-hot-1024.png";
                break;
            case 'Drizzle':
                weatherIcon.src = "https://images.unsplash.com/photo-1608890306831-58efdc14450b?q=80&w=1777&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                break;
            case 'Mist':
                weatherIcon.src = "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                break;
            case 'Snow':
                weatherIcon.src = "https://images.unsplash.com/photo-1542601098-8fc114e148e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                break;
            default:
                weatherIcon.src = "https://www.pngall.com/wp-content/uploads/11/Weather-PNG-Free-Image.png";
        }
        weatherIcon.setAttribute("style", "width: 80px; height: auto");
    }
}

button.addEventListener('click', () => {
    getData(cityInput.value);
});