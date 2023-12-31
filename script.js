const apiKey = "f20298db8377d31ccb48b1dcad25795f";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeater(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (Number(response.status) == 404) {
    // console.log("IF is working");
    document.getElementById("weather_box").style.display = "none";
    document.getElementById("error_text").style.display = "block";
  } else {
    var data = await response.json();
    console.log(data);
    document.getElementById("weather_box").style.display = "block";
    document.getElementById("error_text").style.display = "none";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " KM/h ";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }
  }
}
document.addEventListener("keydown", (event)=> {
  // console.log(event)
  if (event.key === "Enter") {
      // Check if the Enter key is pressed
     searchBtn.click(); 
     // Trigger the button's click event
  }
});

searchBtn.addEventListener("click", () => {
  checkWeater(searchBox.value);
});