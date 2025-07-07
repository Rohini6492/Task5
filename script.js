const apiKey = "321d7ea54cfeafbd42accf2e4983b1fd";

document.getElementById("themeToggle").addEventListener("change", function () {
  document.body.style.background = this.checked ? "var(--bg-dark)" : "var(--bg-light)";
  document.body.style.color = this.checked ? "var(--text-light)" : "var(--text-dark)";
});

function getCityWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById("weatherResult").innerHTML = `<p>${data.message}</p>`;
        return;
      }

      const { name, sys, main, weather, wind } = data;
      const themeColor = weather[0].main.toLowerCase().includes("rain") ? "#3f72af" : "#fff";

      document.body.style.background = themeColor === "#fff" ? "var(--bg-light)" : themeColor;
      document.body.style.color = themeColor === "#fff" ? "#000" : "#fff";

      const html = `
        <h2>${name}, ${sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Condition:</strong> ${weather[0].main}</p>
        <p><strong>Description:</strong> ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
      `;

      document.getElementById("weatherResult").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("weatherResult").innerHTML = `<p>Failed to fetch weather data.</p>`;
    });
}
function resetApp() {
  document.getElementById("cityInput").value = "";
  document.getElementById("weatherResult").innerHTML = "";
  document.body.style.background = "var(--bg-light)";
  document.body.style.color = "var(--text-dark)";
  document.getElementById("themeToggle").checked = false;
}








