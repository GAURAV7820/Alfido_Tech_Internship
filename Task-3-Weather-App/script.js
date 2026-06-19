async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const result = document.getElementById("result");

  if (city === "") {
    result.innerHTML = "<p class='error'>Please enter a city name</p>";
    return;
  }

  result.innerHTML = "<p class='loading'>Loading...</p>";

  try {
    const apiKey = "bfee6cadfaf67772b80b06419f51bf0d";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      result.innerHTML = "<p class='error'>City not found ❌</p>";
      return;
    }

    const icon = data.weather[0].icon;

    result.innerHTML = `
      <div class="weather-card">
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        <p>🌡 Temp: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌥 ${data.weather[0].description}</p>
      </div>
    `;

  } catch (error) {
    result.innerHTML = "<p class='error'>Something went wrong</p>";
  }
}